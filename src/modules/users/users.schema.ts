import { orders, userAddress } from '@app/database/schema';
import { Role } from '@app/types/user';
import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  varchar,
} from 'drizzle-orm/pg-core';

export const roles = pgEnum('roles', [Role.ADMIN, Role.USER]);

export const users = pgTable('users', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar('first_name', { length: 20 }),
  lastName: varchar('last_name', { length: 20 }),
  role: roles('role').default(Role.USER),
  email: varchar('email', { length: 20 }),
  password: varchar('password', { length: 70 }),
  birthDay: varchar('birth_day', { length: 20 }),
  phone: varchar('phone', { length: 20 }),
  isVerify: boolean(),
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
