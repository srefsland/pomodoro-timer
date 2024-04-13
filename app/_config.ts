import { TimerConfig } from "./_types";

export const defaultTimerConfig: TimerConfig = {
  workMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  numberOfRounds: 4,
  autoStartBreak: false,
  autoStartWork: false,
};