import useFetchRetry from "fetch-retry";
import { Scope } from "./scopes";
import { ApiToken } from "./types/auth";
import { RetryOptions } from "./types/fetch_retry";
import {
  CustomError,
  ErrorsBody,
  ForbiddenError,
  NotFoundError,
  NotFoundErrorMessage,
  PermissionErrorMessage,
  RailsErrorMessage,
  UnauthorizedError,
  UnexpectedError,
  UnknownError,
  UnprocessableContentError,
  ValidationErrorMessage,
} from "./errors";

const fetchRetry = useFetchRetry(fetch, {
  retries: 0,
  retryDelay: function (attempt: number): number {
    return Math.pow(2, attempt) * 15000;
  },
});

export async function* indexGenerator<ReturnType, ST extends Scope>(
  path: string,
  apiToken: ApiToken,
  scope: ST,
): AsyncGenerator<ReturnType[], ReturnType[], void> {
  let page = 1;
  while (true) {
    let response: Response;
    try {
      response = await fetchRetry(`${path}?page=${page}${scope.finalQuery}`, {
        retries: 5,
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      });
    } catch (error) {
      const reason: Record<string, string[]> = {};
      if (error instanceof Error) {
        reason[error.constructor.name] = [error.message];
      } else {
        reason["UnknownError"] = [`${error}`];
      }
      throw reason;
    }
    const result = await response.json();
    if (response.ok && result) {
      if (response.headers.get("x-total-pages") === page.toString()) {
        return result;
      } else {
        yield result;
      }
    } else {
      throw result;
    }

    page++;
  }
}

export async function httpGet<ReturnType>(
  path: string,
  apiToken: ApiToken,
  retryOptions: RetryOptions,
): Promise<ReturnType> {
  const request = new Request(path, {
    ...retryOptions,
    method: "GET",
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  });
  return await resolve<ReturnType>(request);
}

export async function httpPost<Params, ReturnType>(
  path: string,
  apiToken: ApiToken,
  data: Params,
): Promise<ReturnType> {
  const request = new Request(path, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
    body: JSON.stringify(data),
  });
  return await resolve<ReturnType>(request);
}

export async function httpPatch<Params, ReturnType>(
  path: string,
  apiToken: ApiToken,
  data: Params,
): Promise<ReturnType> {
  const request = new Request(path, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
    body: JSON.stringify(data),
  });
  return await resolve<ReturnType>(request);
}

export async function httpDelete(
  path: string,
  apiToken: ApiToken,
): Promise<boolean> {
  const request = new Request(path, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  });
  return await resolve<boolean>(request);
}

async function resolve<ReturnType>(request: Request): Promise<ReturnType> {
  let response: Response;
  try {
    response = await fetchRetry(request);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new UnknownError(error);
    }
  }

  // Status 204 is a special case, since this doesn't have a body
  if (response.status === 204) {
    return true as ReturnType;
  }

  // If the body isn't json, we throw an error with the body parsed as plain text
  const contentType = response.headers.get("Content-Type");
  if (contentType !== "application/json") {
    const body = await response.text();
    throw new UnknownError(
      `Expected a JSON response but got ${contentType}`,
      body,
    );
  }

  if (response.ok) {
    return await response.json();
  }

  const body: ErrorsBody = await response.json();

  if (!Array.isArray(body.errors)) {
    throw new UnexpectedError(
      "Received an unhandled JSON error",
      body as unknown as RailsErrorMessage,
    );
  }

  // We throw a specific type of error, depending on the status - we know the type of message that can occur
  // for each body, so we can tell the typescript compiler what we expect
  switch (response.status) {
    case 401:
      throw new UnauthorizedError(body.errors as Array<PermissionErrorMessage>);
    case 403:
      throw new ForbiddenError(
        body.errors as Array<PermissionErrorMessage | ValidationErrorMessage>,
      );
    case 404:
      throw new NotFoundError(body.errors as Array<NotFoundErrorMessage>);
    case 422:
      throw new UnprocessableContentError(
        body.errors as Array<ValidationErrorMessage>,
      );
    default:
      throw new CustomError("Unexpected structured error", body.errors);
  }
}
