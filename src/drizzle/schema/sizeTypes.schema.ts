import { pgTable } from 'drizzle-orm/pg-core';

export const sizeTypes = pgTable('sizeTypes', {});

export type SelectSizeType = typeof sizeTypes.$inferSelect;
export type InsertSizeType = typeof sizeTypes.$inferInsert;
