export type TimerConfig = {
  workMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  numberOfRounds: number;
  autoStartBreak: boolean;
  autoStartWork: boolean;
};

export type TimerSound = {
  name: string;
  file: string;
  label: string;
};

export type BackgroundImage = {
  name: string;
  file: string;
  label: string;
};
