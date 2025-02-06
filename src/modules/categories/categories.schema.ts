import { pgTable } from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {});

export type SelectCategory = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;
