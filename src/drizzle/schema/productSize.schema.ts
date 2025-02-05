import { pgTable } from 'drizzle-orm/pg-core';

export const productSize = pgTable('productSize', {});

export type SelectProductSize = typeof productSize.$inferSelect;
export type InsertProductSize = typeof productSize.$inferInsert;
