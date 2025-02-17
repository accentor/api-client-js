import useFetchRetry from "fetch-retry";
import { Scope } from "./scopes";
import { ApiToken } from "./types/auth";
import { RetryOptions } from "./types/fetch_retry";

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
      const reason = {};
      reason[error.constructor.name] = [error.message];
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
  let response: Response, result: ReturnType;
  try {
    response = await fetchRetry(request);
    result = response.status === 204 ? true : await response.json();
  } catch (error) {
    const reason = {};
    reason[error.constructor.name] = [error.message];
    throw reason;
  }
  if (response.ok) {
    return result;
  } else {
    throw result;
  }
}
