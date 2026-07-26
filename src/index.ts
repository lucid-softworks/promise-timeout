import { withTimeout } from "@lucid-softworks/with-timeout";

export { TimeoutError } from "@lucid-softworks/with-timeout";

/** Rejects if the promise-like value does not settle before the deadline. */
export function promiseTimeout<TValue>(
  value: PromiseLike<TValue>,
  milliseconds: number,
): Promise<TValue> {
  return withTimeout(value, milliseconds);
}
