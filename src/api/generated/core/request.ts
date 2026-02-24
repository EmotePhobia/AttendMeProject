import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

import { OpenAPI } from "./OpenAPI";
import { ApiError } from "./ApiError";
import type { ApiRequestOptions } from "./ApiRequestOptions";
import type { ApiResult } from "./ApiResult";
import { CancelablePromise } from "./CancelablePromise";

function isDefined<T>(value: T | null | undefined): value is T {
  return value !== undefined && value !== null;
}

function buildUrl(options: ApiRequestOptions): string {
  const url = options.url;

  // Path params
  if (options.path) {
    return url.replace(/{(.*?)}/g, (_, key) => {
      const value = (options.path as any)[key];
      return encodeURIComponent(String(value));
    });
  }
  return url;
}

function buildQuery(options: ApiRequestOptions): Record<string, any> | undefined {
  if (!options.query) return undefined;

  const query: Record<string, any> = {};
  for (const [key, value] of Object.entries(options.query)) {
    if (!isDefined(value)) continue;
    query[key] = value;
  }
  return query;
}

async function resolveToken(api: typeof OpenAPI, options: ApiRequestOptions): Promise<string | undefined> {
  const token = api.TOKEN;
  if (!token) return undefined;
  if (typeof token === "string") return token;
  return token(options as any); 
}

async function buildHeaders(api: typeof OpenAPI, options: ApiRequestOptions): Promise<Record<string, string>> {
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(api.HEADERS ?? {}),
    ...(options.headers ?? {}),
  };

  if (options.mediaType) {
    headers["Content-Type"] = options.mediaType;
  }

const token = await resolveToken(api, options);
if (token) headers["Authorization"] = `Bearer ${token}`; 

  return headers;
}

function getResponseBody<T>(response: AxiosResponse): T {
  return response.data as T;
}

function getApiResult(response: AxiosResponse): ApiResult {
  return {
    url: response.config.url ?? "",
    ok: response.status >= 200 && response.status < 300,
    status: response.status,
    statusText: response.statusText,
    body: response.data,
  };
}
function throwIfError(options: ApiRequestOptions, result: ApiResult): void {
  const errors = (options.errors ?? {}) as Record<string, string>;
  const statusKey = String(result.status);

  const message = errors[statusKey] ?? errors["default"] ?? "Request failed";

  if (!result.ok) {
    throw new ApiError(options, result, message);
  }
}

export const request = <T>(api: typeof OpenAPI, options: ApiRequestOptions): CancelablePromise<T> => {
  return new CancelablePromise<T>(async (resolve, reject, onCancel) => {
    try {
      const controller = new AbortController();

      onCancel(() => controller.abort());

      const url = api.BASE + buildUrl(options);
      const query = buildQuery(options);
      const headers = await buildHeaders(api, options);

      const config: AxiosRequestConfig = {
        method: options.method,
        url,
        params: query,
        headers,
        data: options.body,
        signal: controller.signal,
        withCredentials: api.WITH_CREDENTIALS,
      };

      const response = await axios.request(config);
      const result = getApiResult(response);

      throwIfError(options, result);

      resolve(getResponseBody<T>(response));
    } catch (err: any) {
      // axios abort throws a DOMException in browsers; treat as cancel
      if (err?.name === "CanceledError" || err?.name === "AbortError") {
        return;
      }
      reject(err);
    }
  });
};