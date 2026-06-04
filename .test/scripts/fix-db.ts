const fs = require('fs');
const code = import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import initSqlJs, { type Database as SqlJsDbType } from 'sql.js';
import { drizzle } from 'drizzle-orm/sql-js';
import * as schema from '../db/schema.js';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  public db!: ReturnType<typeof drizzle<typeof schema>>;
  private client!: SqlJsDbType;
  private dbPath!: string;

  async onModuleInit() {
    const dbDir = resolve(__dirname, '../db');
    if (!existsSync(dbDir)) {
      mkdirSync(dbDir, { recursive: true });
    }
    this.dbPath = resolve(dbDir, 'app.sqlite');

    const SQL = await initSqlJs();
    if (existsSync(this.dbPath)) {
      const buffer = readFileSync(this.dbPath);
      this.client = new SQL.Database(buffer);
    } else {
      this.client = new SQL.Database();
    }

    this.client.run('PRAGMA foreign_keys = ON');
    this.db = drizzle(this.client, { schema });

    this.migrate();
    this.persist();
  }

  onModuleDestroy() {
    this.persist();
    this.client?.close();
  }

  private migrate() {
    this.client.run(\CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','running','completed','failed')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
)\);
    console.log('Database migrated');
  }

  private persist() {
    if (this.client && this.dbPath) {
      const data = this.client.export();
      writeFileSync(this.dbPath, Buffer.from(data));
    }
  }
}
;
fs.writeFileSync('apps/server/src/database/database.service.ts', code, 'utf8');
console.log('Written');
