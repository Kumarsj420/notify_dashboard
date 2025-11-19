import JSCookie from 'js-cookie';

type CookieOptions = {
  expires?: number; // Expiration in minutes
  path?: string;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  secure?: boolean;
  [key: string]: unknown;
};

/**
 * Get a cookie by name, works for both client and server side
 * @param {string} key - The name of the cookie.
 * @param {any} fallback - The fallback value if the cookie does not exist or is expired.
 * @returns {*} - The cookie value or fallback if not found.
 */
export async function cookieGet<T>(key: string, fallback: T): Promise<string | T> {
  if (typeof window === 'undefined') {
    const cookieStore = await import('next/headers').then((m) => m.cookies());
    const serverCookie = cookieStore.get(key)?.value;
    if (!serverCookie) return fallback;

    try {
      return JSON.parse(serverCookie);
    } catch {
      return serverCookie;
    }
  } else {
    const clientCookie = JSCookie.get(key);
    if (!clientCookie) return fallback;

    try {
      return JSON.parse(clientCookie);
    } catch {
      return clientCookie;
    }
  }
}

/**
 * Set a cookie, works for client side
 * @param {string} key - The name of the cookie.
 * @param {*} value - The value to store in the cookie.
 * @param {number} [exp] - Expiration timeout in minutes.
 * @param options - Additional options for the cookie.
 */
export function cookieSet<T>(key: string, value: T, exp?: number, options?: CookieOptions): T {
  let data = value;

  if (typeof value === 'object') data = JSON.stringify(value) as unknown as T;

  const cookieOptions: CookieOptions = {
    ...options,
  };

  // Convert expiration from minutes to days for js-cookie
  if (exp) cookieOptions.expires = exp / 1440; // 1 day = 1440 minutes

  if (typeof window !== 'undefined') JSCookie.set(key, data as unknown as string, cookieOptions);

  return value;
}

/**
 * Remove a cookie by name, works for client side
 * @param {string} key - Cookie name
 * @returns void
 */
export const cookieRemove = (key: string): void => JSCookie.remove(key);
