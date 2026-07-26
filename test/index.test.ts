import { afterEach, describe, expect, it, vi } from "vitest";

import { promiseTimeout, TimeoutError } from "../src/index.js";

describe("promiseTimeout", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("preserves fulfillment and rejection", async () => {
    const reason = new Error("failed");
    await expect(promiseTimeout(Promise.resolve(1), 100)).resolves.toBe(1);
    await expect(promiseTimeout(Promise.reject(reason), 100)).rejects.toBe(
      reason,
    );
  });

  it("rejects after the deadline", async () => {
    vi.useFakeTimers();
    const captured = promiseTimeout(new Promise<never>(() => {}), 10).catch(
      (error: unknown) => error,
    );
    await vi.advanceTimersByTimeAsync(10);
    await expect(captured).resolves.toBeInstanceOf(TimeoutError);
  });

  it("validates the deadline through the shared implementation", () => {
    expect(() => promiseTimeout(Promise.resolve(), -1)).toThrow(
      "milliseconds must be a finite, non-negative number",
    );
  });
});
