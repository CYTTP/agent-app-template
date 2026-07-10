import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: '../../packages/shared/src/schema/index.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: './db/sqlite.db',
  },
});
