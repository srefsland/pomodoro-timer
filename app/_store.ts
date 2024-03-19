import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BackgroundImage, TimerConfig, TimerSound } from "./_types";

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

interface BackgroundImageState {
  backgroundImage: BackgroundImage;
  setBackgroundImage: (backgroundImage: BackgroundImage) => void;
}

interface BackgroundImagesState {
  backgroundImages: BackgroundImage[];
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

export const useBackgroundImageStore = create<BackgroundImageState>()(
  persist(
    (set) => ({
      backgroundImage: {
        name: "forest",
        file: "/public/forest.png",
        label: "Forest",
      },
      setBackgroundImage: (backgroundImage: BackgroundImage) => {
        set({ backgroundImage });
      },
    }),
    {
      name: "background-image",
    }
  )
);

export const useBackgroundImagesStore = create<BackgroundImagesState>(() => ({
  backgroundImages: [
    {
      name: "forest",
      file: "/public/forest.png",
      label: "Forest",
    },
    {
      name: "sunset",
      file: "/public/sunset.jpg",
      label: "Sunset",
    },
  ],
}));
