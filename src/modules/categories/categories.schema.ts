import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity().unique(),
  name: varchar('name', { length: 255 }).notNull(),
});

export type SelectCategory = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;
