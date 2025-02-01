import {
  decimal,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const orders = pgTable('orders', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  totalPrice: decimal('total_price', { precision: 5, scale: 0 }).notNull(),
  status: varchar('status', { length: 20 }).notNull(),
  firstName: varchar('first_name', { length: 20 }).notNull(),
  lastName: varchar('last_name', { length: 20 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  shippingAddress: text('shipping-address').notNull(),
  paymentType: varchar('payment_type', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export type SelectOrder = typeof orders.$inferSelect;

export type InsertUser = typeof orders.$inferInsert;
