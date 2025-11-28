import { unstable_cache } from 'next/cache';

import { env } from '../config/env';
import { BOT_AGENTS } from '../constants';
import { isClient, isServer } from '../utils';
import { logout } from '../utils/auth';
import { cookieGet, cookieRemove  } from '../utils/cookies';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { redirect } from 'next/navigation';

type Params = Record<string, string>;

const CACHE_TIME_SECS = {
  MINS_15: 15 * 60,
  HOURS_1: 1 * 60 * 60,
  HOURS_6: 6 * 60 * 60,
  DAYS_1: 1 * 24 * 60 * 60,
  DAYS_7: 7 * 24 * 60 * 60,
  DAYS_14: 14 * 24 * 60 * 60,
};

export const getIpAddress = async () => {
  let realIpAddress = await cookieGet<string | undefined | null>('ip', undefined);
  // console.log("realIpAddress from cookie:", realIpAddress);

  if (!realIpAddress && isServer) {
    const { headers: nextHeaders } = await import('next/headers');
    const headersList = await nextHeaders();
    realIpAddress = headersList.get('cf-connecting-ip');
  }

  // If we're on the client side and have the IP from middleware, use it
  // if (!isServer && realIpAddress) {
  //   console.log("Using IP from cookie (client-side):", realIpAddress);
  //   return realIpAddress;
  // }

  // Server-side IP detection
  // if (isServer) {
  //   const { headers: nextHeaders } = await import("next/headers");
  //   const headersList = await nextHeaders();
  //   realIpAddress =
  //     headersList.get("cf-connecting-ip") ||
  //     headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  //     headersList.get("x-real-ip");
  //   console.log("Server-side IP detection:", realIpAddress);
  // }

  return realIpAddress;
};

export const identifyIpAddressAndBot = async (): Promise<[string | undefined | null, boolean]> => {
  let realIpAddress = await cookieGet<string | undefined | null>('ip', undefined);
  let isBot = false;
  if (isServer) {
    const { headers: nextHeaders } = await import('next/headers');
    const headersList = await nextHeaders();
    realIpAddress = headersList.get('cf-connecting-ip');

    const userAgent = headersList.get('user-agent') || '';

    isBot = BOT_AGENTS.some((keyword: string) =>
      userAgent.toLowerCase().includes(keyword.toLowerCase()),
    );
  }

  return [realIpAddress, isBot];
};

const headers = async (skipHeaders = false) => {
  if (skipHeaders) return Promise.resolve({});
  //   const guestToken = cookieGet<string | undefined>('guest_token', undefined);
  const userToken = await cookieGet<string | undefined>('token', undefined);
  //   const lastLocale = cookieGet<string | undefined>('last_locale', 'en');
  const realIpAddress = await getIpAddress();
  // const deviceId = await getDeviceId();

  const baseHeaders: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-app-version': isServer ? '8.8.8' : '1.0.0',
    // 'x-device-id': deviceId,
    // 'x-locale': lastLocale || 'en',
    ...(userToken ? { Authorization: `Bearer ${userToken}` } : {}),
    // ...(guestToken ? { 'guest-token': guestToken } : {}),
  };

  // Only add x-real-ip if it exists
  if (realIpAddress) {
    baseHeaders['x-real-ip'] = realIpAddress;
  }

  if (isServer && realIpAddress) {
    baseHeaders['x-user-ip'] = realIpAddress; // for server side requests, nginx was replacing x-real-ip value, so backup header
  }

  return baseHeaders;
};

const errorHandler = (err: unknown) => {
  if (err instanceof Error) {
    console.log('API', err.message);
    return Promise.reject(err.message);
  }
  return Promise.reject('Something went wrong! Please try again.');
};

const API_URL = isServer ? env.NEXT_PUBLIC_API_PRIMARY : env.NEXT_PUBLIC_API;
const getPath = (url: string) => (url.startsWith('/') ? `${API_URL}${url}` : `${API_URL}/${url}`);

// const responseHandler = (res: Promise<Response>) =>
//   res
//     .then(async (resp) => {
//       console.log('resp here', resp);
//       if (resp.ok) {
//         const contentType = resp.headers.get('content-type');
//         if (contentType?.includes('application/json')) {
//           return resp.json();
//         } else {
//           return resp.text();
//         }
//       }

//       // Handle error responses
//       const contentType = resp.headers.get('content-type');
//       if (contentType?.includes('application/json')) {
//         try {
//           const error = await resp.json();
//           throw new Error(error.message || `HTTP ${resp.status}: ${resp.statusText}`);
//         } catch {
//           throw new Error(`HTTP ${resp.status}: ${resp.statusText}`);
//         }
//       } else {
//         const errorText = await resp.text();
//         throw new Error(errorText || `HTTP ${resp.status}: ${resp.statusText}`);
//       }
//     })
//     .catch(errorHandler);
const responseHandler = async (resPromise: Promise<Response>) => {
  try {
    const resp = await resPromise;

    if (resp.ok) {
      return await resp.json();
    }

    if (resp.status === 401) {
      // Clear cookie (client + server safe)
      cookieRemove('token');

      if (isClient) {
        return logout();
        // Client-side redirect
        // window.location.href = "/login";
      } else {
        // Server-side redirect (App Router only)
        redirect('/login'); // Works only in route handlers/server components
      }

      // throw new Error("Unauthorized – Redirecting to login");
    }

    const error = await resp.json();
    throw new Error(error.message || `HTTP ${resp.status}`);
  } catch (err) {
    if (isRedirectError(err)) throw err;
    else return errorHandler(err);
  }
};
// const responseHandler = (res: Promise<Response>) =>
//   res
//     .then(async (resp) => {
//       if (resp.ok) return resp.json();
//       const error = await resp.json();
//       throw new Error(error.message);
//     })
//     .catch(errorHandler);

const get = <T>(
  path: string,
  params: Record<string, string> = {},
  options: RequestInit & { skipHeaders?: boolean } = {},
): Promise<T> => {
  const url = getPath(path);
  const queryString = new URLSearchParams(params).toString();
  const finalUrl = queryString ? `${url}?${queryString}` : url;

  return headers(options.skipHeaders).then((_headers) =>
    responseHandler(
      fetch(finalUrl, {
        ...options,
        headers: { ..._headers, ...options.headers },
      }),
    ),
  );
};

const getUseCache = {
  mins15: unstable_cache(
    <T>(path: string, params: Params = {}, options: RequestInit = {}): Promise<T> => {
      return get(path, params, { ...options, skipHeaders: true });
    },
    undefined,
    { revalidate: CACHE_TIME_SECS.MINS_15 },
  ),
  hours1: unstable_cache(
    <T>(path: string, params: Params = {}, options: RequestInit = {}): Promise<T> => {
      return get(path, params, { ...options, skipHeaders: true });
    },
    undefined,
    { revalidate: CACHE_TIME_SECS.HOURS_1 },
  ),
  // hours6: unstable_cache(
  //   <T>(path: string, params: Params = {}, options: RequestInit = {}): Promise<T> => {
  //     return get(path, params, { ...options, skipHeaders: true });
  //   },
  //   undefined,
  //   { revalidate: CACHE_TIME_SECS.HOURS_6 },
  // ),
  days1: unstable_cache(
    <T>(path: string, params: Params = {}, options: RequestInit = {}): Promise<T> => {
      return get(path, params, { ...options, skipHeaders: true });
    },
    undefined,
    { revalidate: CACHE_TIME_SECS.DAYS_1 },
  ),
  // days7: unstable_cache(
  //   <T>(path: string, params: Params = {}, options: RequestInit = {}): Promise<T> => {
  //     return get(path, params, { ...options, skipHeaders: true });
  //   },
  //   undefined,
  //   { revalidate: CACHE_TIME_SECS.DAYS_7 },
  // ),
};

const post = <Body extends object, Result>(
  path: string,
  body: Body,
  options: RequestInit = {},
): Promise<Result> => {
  return headers().then((_headers) =>
    responseHandler(
      fetch(getPath(path), {
        method: 'POST',
        body: JSON.stringify(body),
        ...options,
        headers: { ..._headers, ...options.headers },
      }),
    ),
  );
};

const put = <Body extends Record<string | number, unknown>, Result>(
  path: string,
  body: Body,
  options: RequestInit = {},
): Promise<Result> => {
  return headers().then((_headers) =>
    responseHandler(
      fetch(getPath(path), {
        method: 'PUT',
        body: JSON.stringify(body),
        ...options,
        headers: { ..._headers, ...options.headers },
      }),
    ),
  );
};

const remove = <T>(path: string, options: RequestInit = {}): Promise<T> => {
  return headers().then((_headers) =>
    responseHandler(
      fetch(getPath(path), {
        method: 'DELETE',
        ...options,
        headers: { ..._headers, ...options.headers },
      }),
    ),
  );
};

const API = {
  CACHE_TIME_SECS,
  get,
  getUseCache,
  post,
  put,
  remove,
};

export default API;
