import { UniqueIdentifier } from "@dnd-kit/core";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultTimerConfig } from "./_config";
import { Task, TimerConfig, TimerSound } from "./_types";
import { v4 as uuidv4 } from "uuid";

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
  backgroundImage: string;
  setBackgroundImage: (backgroundImage: string) => void;
}

interface BackgroundImagesState {
  backgroundImages: string[];
}

interface HydrateState {
  _hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
}

interface TaskListState {
  tasks: Task[];
  addTask: (task: string) => void;
  removeTask: (id: UniqueIdentifier) => void;
  toggleTaskProgress: (id: UniqueIdentifier) => void;
  reorderTasks: (currentTasks: Task[], doneTasks: Task[]) => void;
}

export const useTaskListStore = create<TaskListState>()(
  persist(
    (set, get) => ({
      tasks: [],
      addTask: (task: string) => {
        const { tasks } = get();
        const newTask = {
          id: uuidv4(),
          task: task,
          done: false,
        };
        set({ tasks: [...tasks, newTask] });
      },
      removeTask: (id: UniqueIdentifier) => {
        const { tasks } = get();
        set({ tasks: tasks.filter((task) => task.id !== id) });
      },
      toggleTaskProgress: (id: UniqueIdentifier) => {
        const { tasks } = get();
        set({
          tasks: tasks.map((task) =>
            task.id === id ? { ...task, done: !task.done } : task
          ),
        });
      },
      reorderTasks: (currentTasks: Task[], doneTasks: Task[]) => {
        set({ tasks: [...currentTasks, ...doneTasks] });
      },
    }),
    {
      name: "task-list",
    }
  )
);

export const useTimerConfigStore = create<TimerConfigState>()(
  persist(
    (set) => ({
      timerConfig: defaultTimerConfig,
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
    {
      name: "LevelUp",
      file: "/level_up.mp3",
      label: "Level Up",
    },
  ],
}));

export const useBackgroundImageStore = create<BackgroundImageState>()(
  persist(
    (set) => ({
      backgroundImage: "Dark Forest",
      setBackgroundImage: (backgroundImage: string) => {
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
    "Dark Forest",
    "Mountainous Sunset",
    "Rainstorm Beneath the Summit",
  ],
}));

export const useHydrateStore = create<HydrateState>()(
  persist(
    (set) => ({
      _hasHydrated: false,
      setHasHydrated: (hasHydrated: boolean) => {
        set({ _hasHydrated: hasHydrated });
      },
    }),
    {
      name: "hydrate",
      onRehydrateStorage: (state) => {
        state.setHasHydrated(true);
      },
    }
  )
);
