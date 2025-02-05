import { pgTable } from 'drizzle-orm/pg-core';

export const orderItems = pgTable('orderItems', {});

export type SelectOrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = typeof orderItems.$inferInsert;
