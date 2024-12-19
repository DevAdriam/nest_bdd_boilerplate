import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.string().default('3000').transform(Number),
  NODE_ENV: z.string().default('development'),
  JWT_SECRET_KEY: z.string().min(1, 'JWT_SECRET_KEY is required'),
  TOKEN_EXPIRATION_TIME: z.string().default('1d'),
  HASH_ROUND: z.string().default('10').transform(Number),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  API_VERSION: z.string().default('v1'),
  DEFAULT_API_VERSION: z.string().default('1'),
  GMAIL_USER: z.string().nullable().optional(),
  GMAIL_PASS: z.string().nullable().optional(),
  GOOGLE_CLIENT_ID: z.string().nullable().optional(),
  GOOGLE_CLIENT_SECRET: z.string().nullable().optional(),
  GOOGLE_CALLBACK_URL: z.string().nullable().optional(),
});

export type Env = z.infer<typeof envSchema>;
