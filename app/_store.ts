import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TimerConfig, TimerSound } from "./_types";

interface TimerConfigState {
  timerConfig: TimerConfig;
  setTimerConfig: (timerConfig: TimerConfig) => void;
}

interface TimerVolumeState {
  audioVolume: number;
  setAudioVolume: (volume: number) => void;
}

interface TimerSoundState {
  timerSound: TimerSound;
  setTimerSound: (sound: TimerSound) => void;
}

interface TimerSoundsState {
  sounds: TimerSound[];
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

export const useTimerVolumeStore = create<TimerVolumeState>()(
  persist(
    (set) => ({
      audioVolume: 50,
      setAudioVolume: (volume: number) => {
        set({ audioVolume: volume });
      },
    }),
    {
      name: "timer-volume",
    }
  )
);

export const useSelectedTimerSoundStore = create<TimerSoundState>()(
  persist(
    (set) => ({
      timerSound: {
        name: "Kitchen",
        file: "/kitchen_timer.mp3",
        label: "Kitchen Timer",
      },
      setTimerSound: (sound: TimerSound) => {
        set({ timerSound: sound });
      },
    }),
    {
      name: "timer-sound",
    }
  )
);

export const useTimerSoundsStore = create<TimerSoundsState>(() => ({
  sounds: [
    {
      name: "Kitchen",
      file: "/kitchen_timer.mp3",
      label: "Kitchen Timer",
    },
  ],
}));
