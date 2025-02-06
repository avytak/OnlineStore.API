import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar('first_name', { length: 20 }).notNull(),
  lastName: varchar('last_name', { length: 20 }).notNull(),
  role: varchar('role', { length: 10 }).notNull().default('user'),
  email: varchar('email', { length: 20 }).notNull(),
  password: varchar('password', { length: 70 }).notNull(),
  token: varchar('token', { length: 200 }).default(null),
});

export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
