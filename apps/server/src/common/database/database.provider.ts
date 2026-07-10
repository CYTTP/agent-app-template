import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import BetterSqlite3 from 'better-sqlite3';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, isAbsolute, resolve } from 'node:path';
import { drizzle, type BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import * as schema from '@shared/main/schema';
import type { AppConfig } from '../../config/app.config';
import { APP_CONFIG } from '../../config/config.tokens';

export type AppDatabase = BetterSQLite3Database<typeof schema>;
type SqliteDatabase = BetterSqlite3.Database;

export interface DatabaseConnection {
  db: AppDatabase;
  sqlite: SqliteDatabase;
  path: string;
}

export function resolveDatabasePath(databaseUrl: string): string {
  return isAbsolute(databaseUrl) ? databaseUrl : resolve(process.cwd(), databaseUrl);
}

export function createDatabaseConnection(config: Pick<AppConfig, 'databaseUrl'>): DatabaseConnection {
  const databasePath = resolveDatabasePath(config.databaseUrl);
  const databaseDir = dirname(databasePath);

  if (!existsSync(databaseDir)) {
    mkdirSync(databaseDir, { recursive: true });
  }

  const sqlite = new BetterSqlite3(databasePath);

  sqlite.pragma('journal_mode = WAL');
  sqlite.pragma('synchronous = NORMAL');
  sqlite.pragma('foreign_keys = ON');
  sqlite.pragma('busy_timeout = 5000');

  return {
    db: drizzle(sqlite, { schema }),
    sqlite,
    path: databasePath,
  };
}

@Injectable()
export class DatabaseProvider implements OnApplicationShutdown {
  private readonly connection: DatabaseConnection;

  constructor(@Inject(APP_CONFIG) config: AppConfig) {
    this.connection = createDatabaseConnection(config);
  }

  get db(): AppDatabase {
    return this.connection.db;
  }

  get path(): string {
    return this.connection.path;
  }

  onApplicationShutdown(): void {
    this.connection.sqlite.close();
  }
}
