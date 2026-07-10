import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { loadAppConfig } from '../../config/app.config';
import { createDatabaseConnection } from './database.provider';

const connection = createDatabaseConnection(loadAppConfig());

try {
  migrate(connection.db, { migrationsFolder: './drizzle' });
  console.log(`Migrations applied successfully: ${connection.path}`);
} finally {
  connection.sqlite.close();
}
