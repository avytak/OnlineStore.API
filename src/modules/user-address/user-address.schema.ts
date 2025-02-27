import { users } from '@app/database/schema';
import { relations } from 'drizzle-orm';
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const userAddress = pgTable('userAddress', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  street: varchar('street', { length: 100 }),
  city: varchar('city', { length: 100 }),
  state: varchar('state', { length: 100 }),
  postalCode: varchar('postal_code', { length: 20 }),
  country: varchar('country', { length: 100 }),
});

export const userAddressRelations = relations(userAddress, ({ one }) => ({
  user: one(users, { fields: [userAddress.userId], references: [users.id] }),
}));

export type InsertUserAddress = typeof userAddress.$inferInsert;
export type SelectUserAddress = typeof userAddress.$inferSelect;
