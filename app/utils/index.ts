import { cookieGet, cookieSet } from './cookies';
import { v4 as uuidv4 } from 'uuid';

export const isServer = typeof window === 'undefined';
export const isClient = typeof window !== 'undefined';

export const getDeviceId = async () => {
  const deviceIdCacheKey = 'device_id';
  const MINUTES_IN_NINETY_DAYS = 90 * 24 * 60;
  let deviceId = await cookieGet(deviceIdCacheKey, undefined);
  if (!deviceId) {
    deviceId = cookieSet(deviceIdCacheKey, uuidv4(), MINUTES_IN_NINETY_DAYS);
  }
  return deviceId;
};

/**
 * Returns the name of a user.
 * Handles missing/null/undefined values gracefully.
 */
export function getUserFullName(user: { name?: string | null } | null | undefined): string {
  if (!user) return '';
  return user.name?.trim() || '';
}
