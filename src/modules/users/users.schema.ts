import { orders, userAddress } from '@app/database/schema';
import { relations } from 'drizzle-orm';
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar('first_name', { length: 20 }).notNull(),
  lastName: varchar('last_name', { length: 20 }).notNull(),
  role: varchar('role', { length: 10 }).notNull().default('user'),
  email: varchar('email', { length: 20 }).notNull(),
  password: varchar('password', { length: 70 }).notNull(),
});

export const usersRelations = relations(users, ({ many, one }) => ({
  orders: many(orders),
  userAddress: one(userAddress, {
    fields: [users.id],
    references: [userAddress.userId],
  }),
}));

export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
