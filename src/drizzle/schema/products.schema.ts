import { pgTable } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {});

export type SelectProduct = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;
