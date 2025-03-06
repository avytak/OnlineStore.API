import { relations } from 'drizzle-orm';
import {
  decimal,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

import { categories } from '../categories/categories.schema';

export const products = pgTable('products', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  discountPrice: decimal('discount_price', {
    precision: 10,
    scale: 2,
  }),
  categoryId: integer('category_id')
    .notNull()
    .references(() => categories.id, { onDelete: 'cascade' }),
  image: text('image_url'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const productsRelations = relations(products, ({ one }) => ({
  product: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
}));

export type SelectProduct = typeof products.$inferSelect;

export type InsertProduct = typeof products.$inferInsert;
