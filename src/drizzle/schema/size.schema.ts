import { pgTable } from 'drizzle-orm/pg-core';

export const sizes = pgTable('sizes', {});

export type SelectSize = typeof sizes.$inferSelect;
export type InsertSize = typeof sizes.$inferInsert;
