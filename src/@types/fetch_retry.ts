// This is copied from fetch-retry/index.d.ts
// fetch-retry does not export these types

export type RequestDelayFunction = (
  attempt: number,
  error: Error | null,
  response: Response | null
) => number;

export type RequestRetryOnFunction = (
  attempt: number,
  error: Error | null,
  response: Response | null
) => boolean | Promise<boolean>;

export interface RequestInitWithRetry extends RequestInit {
  retries?: number;
  retryDelay?: number | RequestDelayFunction;
  retryOn?: number[] | RequestRetryOnFunction;
}

// This interface is created by us
export interface RetryOptions {
  retries?: number;
  retryDelay?: number | RequestDelayFunction;
  retryOn?: number[] | RequestRetryOnFunction;
}
