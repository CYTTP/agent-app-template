import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().optional(),
  SERVER_PORT: z
    .preprocess(
      (value) => value ?? process.env.PORT,
      z.coerce.number().int().positive().default(8787),
    ),
  CORS_ORIGINS: z.string().default('http://localhost:5173,http://localhost:8080'),
  DATABASE_URL: z.string().min(1).default('./db/sqlite.db'),
});

export type AppEnv = z.infer<typeof envSchema>;
