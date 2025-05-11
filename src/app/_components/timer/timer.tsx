"use client";

import { useTimerAudio } from "@/hooks/use-timer-audio";
import { delay } from "@/lib/utils";
import { useHydrateStore, useTimerConfigStore } from "@/store";
import { TimerConfig } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  IoPause,
  IoPlay,
  IoPlaySkipForwardOutline,
  IoReload,
} from "react-icons/io5";

type TimerState = "work" | "shortBreak" | "longBreak";

const timerStateTitles = {
  work: "Focus",
  shortBreak: "Short break",
  longBreak: "Long break",
};

const getTimerStateSeconds = (timerConfig: TimerConfig) => {
  return {
    work: timerConfig.workMinutes * 60,
    shortBreak: timerConfig.shortBreakMinutes * 60,
    longBreak: timerConfig.longBreakMinutes * 60,
  };
};

const getNextState = (
  timerState: TimerState,
  currentRound: number,
  numberOfRounds: number
) => {
  if (timerState === "shortBreak" || timerState === "longBreak") {
    return "work";
  }

  return currentRound % numberOfRounds === 0 ? "longBreak" : "shortBreak";
};

export default function Timer() {
  const [time, setTime] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [timerState, setTimerState] = useState<TimerState>("work");

  const workerRef = useRef<Worker | null>(null);

  const timerConfig = useTimerConfigStore((state) => state.timerConfig);
  const hydrated = useHydrateStore((state) => state._hasHydrated);

  const { playTimerAudio } = useTimerAudio();

  const sendStartMessage = useCallback(
    (time: number) => {
      workerRef.current?.postMessage({
        type: "start",
        payload: time,
      });
    },
    [workerRef]
  );

  const sendStopMessage = useCallback(() => {
    workerRef.current?.postMessage({
      type: "stop",
    });
  }, [workerRef]);

  const handleWorkerMessage = (event: MessageEvent) => {
    if (event.data.type === "tick") {
      const remainingTime = event.data.payload;

      setTime(remainingTime);

      if (remainingTime <= 0) {
        progressRoundRef.current();
      }
    }
  };

  const toggleTimer = useCallback(() => {
    if (!isRunning) {
      sendStartMessage(time);
    } else {
      sendStopMessage();
    }

    setIsRunning(!isRunning);
  }, [isRunning, sendStartMessage, sendStopMessage, time]);

  const reset = useCallback(() => {
    setTime(getTimerStateSeconds(timerConfig)[timerState]);
    setIsRunning(false);
    sendStopMessage();
  }, [timerConfig, timerState, sendStopMessage]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) {
        return;
      }

      if (event.key === " ") {
        event.preventDefault();
        toggleTimer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleTimer]);

  useEffect(() => {
    if (!hydrated) {
      return;
    } else {
      setTime(getTimerStateSeconds(timerConfig)[timerState]);
    }

    const worker = new Worker(new URL("@/timer.worker.ts", import.meta.url));
    workerRef.current = worker;
    workerRef.current.onmessage = handleWorkerMessage;

    return () => {
      worker.terminate();
    };
  }, [hydrated, timerConfig, timerState]);

  useEffect(() => {
    window.document.title = `${formatTime(time)} | ${
      timerStateTitles[timerState]
    }`;
  }, [time, timerState]);

  useEffect(() => {
    reset();
  }, [timerConfig, reset]);

  const progressRound = useCallback(async () => {
    setIsRunning(false);
    sendStopMessage();

    const nextState = getNextState(
      timerState,
      currentRound,
      timerConfig.numberOfRounds
    );
    const newTime = getTimerStateSeconds(timerConfig)[nextState];
    setTime(newTime);

    setCurrentRound((prevRound) =>
      timerState === "work"
        ? prevRound
        : (prevRound % timerConfig.numberOfRounds) + 1
    );

    setTimerState(nextState);

    await playTimerAudio();

    const shouldAutoStart =
      timerState === "work"
        ? timerConfig.autoStartBreak
        : timerConfig.autoStartWork;

    if (shouldAutoStart) {
      await delay(1500);
      sendStartMessage(newTime);
    }

    setIsRunning(shouldAutoStart);
  }, [
    timerConfig,
    timerState,
    sendStopMessage,
    currentRound,
    sendStartMessage,
  ]);

  const progressRoundRef = useRef(progressRound);

  useEffect(() => {
    progressRoundRef.current = progressRound;
  }, [progressRound]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      className="flex flex-col items-center min-w-72"
      data-test-id="timer-round"
    >
      <h1 className="text-2xl text-white border-1 w-16 py-1 rounded-3xl self-end mb-4 text-center">
        {currentRound}/{timerConfig.numberOfRounds}
      </h1>
      <h1 className="text-4xl mb-2 font-medium" data-testid="timer-state-title">
        {timerStateTitles[timerState]}
      </h1>
      <h1
        className="mb-4 text-8xl font-light font-mono tracking-tighter"
        data-testid="timer-clock"
      >
        {formatTime(time)}
      </h1>
      <div className="flex gap-4">
        <button
          onClick={toggleTimer}
          aria-label="Play/pause"
          data-testid="play-pause"
        >
          {!isRunning ? (
            <IoPlay className="size-8 font-bold" />
          ) : (
            <IoPause className="size-8 font-bold" />
          )}
        </button>
        <button onClick={reset} aria-label="Reset" data-testid="reset">
          <IoReload className="size-8 font-bold" />
        </button>
        <button onClick={progressRound} aria-label="Reset" data-testid="skip">
          <IoPlaySkipForwardOutline className="size-8" />
        </button>
      </div>
    </div>
  );
}
