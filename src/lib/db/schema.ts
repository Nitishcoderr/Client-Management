import { sql } from 'drizzle-orm';
import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('fname', { length: 100 }).notNull(),
  email: varchar('email', { length: 100 }).unique().notNull(),
  provider: varchar('provider', { length: 20 }),
  externalId: varchar('external_id', { length: 100 }).notNull(),
  role: varchar("role",{length:12}).notNull().default("customer"),
  updatedAt:timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
  createdAt:timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
});
