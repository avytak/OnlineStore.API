import { users } from '@app/database/schema';
import { Status } from '@app/types/orders';
import { relations } from 'drizzle-orm';
import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const statuses = pgEnum('statuses', [
  Status.PROCESSING,
  Status.SENT,
  Status.DELIVERED,
  Status.CANCELLED,
]);

export const orders = pgTable('orders', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  status: statuses('status').default(Status.PROCESSING),
  paymentType: varchar('payment_type', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  userId: integer('userId')
    .notNull()
    .references(() => users.id),
});

export const ordersRelations = relations(orders, ({ one }) => ({
  user: one(users, { fields: [orders.userId], references: [users.id] }),
}));

export type SelectOrder = typeof orders.$inferSelect;

export type InsertOrder = typeof orders.$inferInsert;
