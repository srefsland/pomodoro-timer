import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TimerConfig } from "./_types";

interface TimerConfigState {
  timerConfig: TimerConfig;
  _hasRehydrated: boolean;
  setTimerConfig: (timerConfig: TimerConfig) => void;
  setHasRehydrated: (state: boolean) => void;
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
      _hasRehydrated: false,
      setTimerConfig: (timerConfig: TimerConfig) => {
        set({ timerConfig });
      },
      setHasRehydrated: (state: boolean) => {
        set({ _hasRehydrated: state });
      },
    }),
    {
      name: "timer-config",
      onRehydrateStorage: () => (state) => {
        state?.setHasRehydrated(true);
      },
    }
  )
);
