type TimerMessage = { type: string; payload: number };
type TickMessage = { type: "tick"; payload: number };

interface TimerState {
  startSeconds: number;
  startTime: number;
  lastRemainingTime: number;
  interval: ReturnType<typeof setInterval> | null;
  isRunning: boolean;
}

const state: TimerState = {
  startSeconds: 0,
  startTime: 0,
  lastRemainingTime: 0,
  interval: null,
  isRunning: false,
};

function clearTimer() {
  if (state.interval) {
    clearInterval(state.interval);
    state.interval = null;
  }
}

function resetState() {
  state.startTime = 0;
  state.startSeconds = 0;
  state.lastRemainingTime = 0;
}

function tick(postMessage: (msg: TickMessage) => void) {
  if (!state.isRunning && state.interval) {
    clearTimer();
    resetState();
    return;
  }

  const elapsedTime = Math.floor((Date.now() - state.startTime) / 1000);
  const remainingTime = state.startSeconds - elapsedTime;

  if (remainingTime !== state.lastRemainingTime) {
    state.lastRemainingTime = remainingTime;
    postMessage({ type: "tick", payload: remainingTime });
  }
}

export function handleMessages(
  messages: TimerMessage[],
  postMessage: (msg: TickMessage) => void
) {
  messages.forEach((message) => {
    if (message.type === "startSeconds") {
      state.startSeconds = message.payload;
      state.lastRemainingTime = state.startSeconds;
    } else if (message.type === "startTime") {
      state.startTime = message.payload;
    } else if (message.type === "stop") {
      state.isRunning = false;
    } else if (message.type === "start") {
      state.isRunning = true;
    }
  });

  clearTimer();
  state.interval = setInterval(() => tick(postMessage), 100);
}

self.onmessage = (event) => {
  handleMessages(event.data, postMessage);
};
