"use client";

import { useEffect, useMemo, useState } from "react";
import { capitalize } from "../_utils";
import TimerControlButton from "./timer-control-button";

type TimerProps = {
  timerConfig: TimerConfig;
};

type TimerState = "work" | "shortBreak" | "longBreak";

export default function Timer({ timerConfig }: TimerProps) {
  const [time, setTime] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [timerState, setTimerState] = useState<TimerState>("work");

  const timerStateTimes = useMemo(() => {
    return {
      work: timerConfig.workMinutes * 60,
      shortBreak: timerConfig.shortBreakMinutes * 60,
      longBreak: timerConfig.longBreakMinutes * 60,
    };
  }, [timerConfig]);

  const timerStateTitles = useMemo(() => {
    return {
      work: "work",
      shortBreak: "short break",
      longBreak: "long break",
    };
  }, []);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      if (time === 1) {
        clearInterval(timeInterval);
        progressRound();
      } else if (!isRunning) {
        clearInterval(timeInterval);
      } else {
        setTime((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => clearInterval(timeInterval);
  });

  useEffect(() => {
    setTime(timerStateTimes[timerState]);
  }, [timerState, timerStateTimes]);

  const getNextState = (timerState: TimerState) => {
    if (timerState === "shortBreak" || timerState === "longBreak") {
      return "work";
    }

    return currentRound % timerConfig.numberOfRounds === 0
      ? "longBreak"
      : "shortBreak";
  };

  const progressRound = () => {
    if (timerState !== "work") {
      // Reset if prevround was the number of rounds set
      setCurrentRound(
        (prevRound) => (prevRound % timerConfig.numberOfRounds) + 1
      );
      setIsRunning(timerConfig.autoStartWork);
    } else {
      setIsRunning(timerConfig.autoStartBreak);
    }
    setTimerState((timerState) => getNextState(timerState));
  };

  const reset = () => {
    setTime(timerStateTimes[timerState]);
    setIsRunning(false);
  };

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl">
        Round {currentRound}/{timerConfig.numberOfRounds}
      </h1>

      <h1 className="text-lg">{capitalize(timerStateTitles[timerState])}</h1>
      <h1 className="mb-4 text-6xl">{formatTime()}</h1>
      <div className="flex gap-2">
        <TimerControlButton
          label={!isRunning ? "Start" : "Stop"}
          onClick={() => setIsRunning(!isRunning)}
        />
        <TimerControlButton label="Reset" onClick={reset} />
        <TimerControlButton label="Skip" onClick={progressRound} />
      </div>
    </div>
  );
}
