import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  isServer: typeof window === 'undefined',
  server: {
    // HOSTNAME: z.string().optional(),
    PORT: z.string().optional(),
    AUTH_URL: z.string().url(),
    AUTH_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_SITE_URL: z.string().url(),
    NEXT_PUBLIC_API: z.string().url(),
    NEXT_PUBLIC_API_PRIMARY: z.string().url(),
    NEXT_PUBLIC_RELEASE: z.enum(['production', 'staging', 'development']),
  },
  runtimeEnv: {
    // HOSTNAME: process.env.HOSTNAME,
    PORT: process.env.PORT,
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_URL: process.env.AUTH_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_API: process.env.NEXT_PUBLIC_API,
    NEXT_PUBLIC_API_PRIMARY: process.env.NEXT_PUBLIC_API_PRIMARY,
    NEXT_PUBLIC_RELEASE: process.env.NEXT_PUBLIC_RELEASE,
  },
});
