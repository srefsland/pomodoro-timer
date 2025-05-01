import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { handleMessage } from "../../src/timer.worker";

let postMessage: ReturnType<typeof vi.fn>;

beforeEach(() => {
  vi.useFakeTimers();
  postMessage = vi.fn();
});

afterEach(() => {
  vi.clearAllTimers();
  vi.useRealTimers();
  postMessage.mockReset();
});

describe("Timer Module", () => {
  it("should set startSeconds and startTime and begin ticking", () => {
    const now = Date.now();
    vi.setSystemTime(now);

    handleMessage({ type: "start", payload: 5 }, postMessage, now);

    vi.advanceTimersByTime(1000);
    expect(postMessage).toHaveBeenCalledWith({ type: "tick", payload: 4 });

    vi.advanceTimersByTime(1000);
    expect(postMessage).toHaveBeenCalledWith({ type: "tick", payload: 3 });
  });

  it("should not tick when timer is stopped", () => {
    const now = Date.now();
    vi.setSystemTime(now);

    handleMessage({ type: "stop" }, postMessage, now);

    vi.advanceTimersByTime(2000);
    expect(postMessage).not.toHaveBeenCalled();
  });

  it("should clear and reset state when isRunning is false but interval exists", () => {
    const now = Date.now();
    vi.setSystemTime(now);

    handleMessage({ type: "start", payload: 2 }, postMessage, now);

    vi.advanceTimersByTime(100);
    handleMessage({ type: "stop" }, postMessage, now);

    vi.advanceTimersByTime(100);
    expect(postMessage).not.toHaveBeenCalledWith({ type: "tick", payload: 1 });
  });

  it("should send tick only when remainingTime changes", () => {
    const now = Date.now();
    vi.setSystemTime(now);

    handleMessage({ type: "start", payload: 3 }, postMessage, now);

    vi.advanceTimersByTime(100);
    vi.advanceTimersByTime(1000);
    vi.advanceTimersByTime(1000);

    expect(postMessage).toHaveBeenCalledTimes(2);
    expect(postMessage).toHaveBeenNthCalledWith(1, {
      type: "tick",
      payload: 2,
    });
    expect(postMessage).toHaveBeenNthCalledWith(2, {
      type: "tick",
      payload: 1,
    });
  });
});
