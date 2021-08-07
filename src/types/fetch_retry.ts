import {
  RequestDelayFunction,
  RequestRetryOnFunction,
} from "../../vendor/fetch-retry/types";

export interface RetryOptions {
  retries?: number;
  retryDelay?: number | RequestDelayFunction;
  retryOn?: number[] | RequestRetryOnFunction;
}
