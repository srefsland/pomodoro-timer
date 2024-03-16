import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TimerConfig } from "./_types";

interface TimerConfigState {
  timerConfig: TimerConfig;
  setTimerConfig: (timerConfig: TimerConfig) => void;
}

interface TimerAudioState {
  audioVolume: number;
  setAudioVolume: (volume: number) => void;
}

export const useTimerConfigStore = create<TimerConfigState>()(
  persist(
    (set) => ({
      timerConfig: {
        workMinutes: 25,
        shortBreakMinutes: 5,
        longBreakMinutes: 15,
        numberOfRounds: 4,
        autoStartBreak: true,
        autoStartWork: true,
      },
      setTimerConfig: (timerConfig: TimerConfig) => {
        set({ timerConfig });
      },
    }),
    {
      name: "timer-config",
    }
  )
);

export const useTimerAudioStore = create<TimerAudioState>()(
  persist(
    (set) => ({
      audioVolume: 50,
      setAudioVolume: (volume: number) => {
        set({ audioVolume: volume });
      },
    }),
    {
      name: "timer-audio",
    }
  )
);
