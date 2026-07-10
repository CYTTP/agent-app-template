import { envSchema } from './env.schema';

export interface AppConfig {
  nodeEnv: 'development' | 'test' | 'production';
  serverPort: number;
  corsOrigins: string[];
  databaseUrl: string;
}

export function loadAppConfig(): AppConfig {
  const env = envSchema.parse(process.env);

  return {
    nodeEnv: env.NODE_ENV,
    serverPort: env.SERVER_PORT,
    corsOrigins: env.CORS_ORIGINS.split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
    databaseUrl: env.DATABASE_URL,
  };
}
