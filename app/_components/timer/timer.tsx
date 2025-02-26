"use client";

import {
  useHydrateStore,
  useSelectedTimerSoundStore,
  useTimerConfigStore,
  useTimerVolumeStore,
} from "@/app/_store";
import { delay } from "@/app/_utils";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  IoPause,
  IoPlay,
  IoPlaySkipForwardOutline,
  IoReload,
} from "react-icons/io5";

type TimerState = "work" | "shortBreak" | "longBreak";

export default function Timer() {
  const [time, setTime] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [timerState, setTimerState] = useState<TimerState>("work");

  const audioRef = useRef<HTMLAudioElement>(null);
  const workerRef = useRef<Worker | null>(null);

  const timerConfig = useTimerConfigStore((state) => state.timerConfig);
  const audioVolume = useTimerVolumeStore((state) => state.audioVolume);
  const timerSound = useSelectedTimerSoundStore((state) => state.timerSound);
  const hydrated = useHydrateStore((state) => state._hasHydrated);

  const timerStateTimes = useMemo(() => {
    return {
      work: timerConfig.workMinutes * 60,
      shortBreak: timerConfig.shortBreakMinutes * 60,
      longBreak: timerConfig.longBreakMinutes * 60,
    };
  }, [timerConfig]);

  const timerStateTitles = useMemo(() => {
    return {
      work: "Focus",
      shortBreak: "Short break",
      longBreak: "Long break",
    };
  }, []);

  const sendStartMessage = (time: number) => {
    workerRef.current?.postMessage([
      {
        type: "startSeconds",
        payload: time,
      },
      {
        type: "startTime",
        payload: Date.now(),
      },
      {
        type: "start",
      },
    ]);
  };

  const sendStopMessage = () => {
    workerRef.current?.postMessage([
      {
        type: "stop",
      },
    ]);
  };

  useEffect(() => {
    if (!hydrated) {
      return;
    } else {
      setTime(timerStateTimes[timerState]);
    }

    workerRef.current = new Worker(
      new URL("@/timer-worker.ts", import.meta.url)
    );

    workerRef.current.onmessage = (event) => {
      if (event.data.type === "tick") {
        const remainingTime = event.data.payload;

        setTime(remainingTime);

        if (remainingTime <= 0) {
          progressRound();
        }
      }
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, [hydrated]);

  useEffect(() => {
    window.document.title = `${formatTime(time)} | ${
      timerStateTitles[timerState]
    }`;
  }, [time, timerState, timerStateTitles]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = audioVolume / 100;
    }
  }, [audioVolume]);

  useEffect(() => {
    reset();
  }, [timerConfig]);

  const getNextState = (timerState: TimerState) => {
    if (timerState === "shortBreak" || timerState === "longBreak") {
      return "work";
    }

    return currentRound % timerConfig.numberOfRounds === 0
      ? "longBreak"
      : "shortBreak";
  };

  const progressRound = async () => {
    setIsRunning(false);
    sendStopMessage();

    const nextState = getNextState(timerState);
    const newTime = timerStateTimes[nextState];
    setTime(newTime);

    setCurrentRound((prevRound) =>
      timerState === "work"
        ? prevRound
        : (prevRound % timerConfig.numberOfRounds) + 1
    );

    setTimerState(nextState);

    if (audioRef.current) {
      await audioRef.current.play();
    }

    const shouldAutoStart =
      timerState === "work"
        ? timerConfig.autoStartBreak
        : timerConfig.autoStartWork;

    if (shouldAutoStart) {
      await delay(1500);
      sendStartMessage(newTime);
    }

    setIsRunning(shouldAutoStart);
  };

  const toggleTimer = () => {
    if (!isRunning) {
      sendStartMessage(time);
    } else {
      sendStopMessage();
    }

    setIsRunning(!isRunning);
  };

  const reset = () => {
    setTime(timerStateTimes[timerState]);
    setIsRunning(false);
    sendStopMessage();
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="flex flex-col items-center min-w-72">
      <h1 className="text-2xl text-white border-1 w-16 py-1 rounded-3xl self-end mb-4 text-center">
        {currentRound}/{timerConfig.numberOfRounds}
      </h1>
      <h1 className="text-4xl mb-2 font-medium">
        {timerStateTitles[timerState]}
      </h1>
      <h1 className="mb-4 text-8xl font-light font-mono tracking-tighter">
        {formatTime(time)}
      </h1>
      <div className="flex gap-4">
        <button onClick={toggleTimer} aria-label="Play/pause">
          {!isRunning ? (
            <IoPlay className="size-8 font-bold" />
          ) : (
            <IoPause className="size-8 font-bold" />
          )}
        </button>
        <button onClick={reset} aria-label="Reset">
          <IoReload className="size-8 font-bold" />
        </button>
        <button onClick={progressRound} aria-label="Reset">
          <IoPlaySkipForwardOutline className="size-8" />
        </button>
      </div>
      {timerSound.file && (
        <audio ref={audioRef} src={timerSound.file} crossOrigin="anonymous" />
      )}
    </div>
  );
}
