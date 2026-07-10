import { sql, type InferInsertModel, type InferSelectModel } from 'drizzle-orm';
import { integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const examples = sqliteTable(
  'examples',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    description: text('description'),
    createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [uniqueIndex('examples_name_unique_idx').on(table.name)],
);

export type Example = InferSelectModel<typeof examples>;
export type NewExample = InferInsertModel<typeof examples>;
