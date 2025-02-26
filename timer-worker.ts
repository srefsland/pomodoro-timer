let startSeconds = 0;
let startTime = 0;
let lastRemainingTime = 0;
let interval: ReturnType<typeof setInterval> | null = null;
let isRunning = false;

self.onmessage = (event) => {
  const messages = event.data;

  messages.forEach((message: { type: string; payload: number }) => {
    if (message.type === "startSeconds") {
      startSeconds = message.payload;
      lastRemainingTime = startSeconds;
    } else if (message.type === "startTime") {
      startTime = message.payload;
    } else if (message.type === "stop") {
      isRunning = false;
    } else if (message.type === "start") {
      isRunning = true;
    }
  });

  // Immediately check and clear the interval if necessary
  if (interval) {
    clearInterval(interval);
    interval = null;
  }

  interval = setInterval(() => {
    if (!isRunning && interval) {
      clearInterval(interval);
      interval = null;
      startTime = 0;
      startSeconds = 0;
      lastRemainingTime = 0;
      return;
    }

    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    const remainingTime = startSeconds - elapsedTime;

    // Only send a tick if the remaining time has changed
    if (remainingTime !== lastRemainingTime) {
      lastRemainingTime = remainingTime;
      postMessage({
        type: "tick",
        payload: remainingTime,
      });
    }
  }, 100);
};
