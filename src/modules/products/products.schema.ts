import {
  decimal,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

// Визначення таблиці "product"
export const products = pgTable('products', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity().unique(), // Унікальний ідентифікатор продукту
  name: varchar('name', { length: 255 }).notNull(), // Назва продукту
  description: text('description'), // Опис продукту
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  discountPrice: decimal('discount_price', {
    precision: 10,
    scale: 2,
  }),
  // categoryId: integer('category_id')
  //   .notNull()
  //   .references(() => categories.id, { onDelete: 'cascade' }), // Категорія продукту
  image: text('image_url'), // URL зображення продукту
  createdAt: timestamp('created_at').defaultNow(), // Дата створення запису
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()), // Дата оновлення запису
});

export type SelectProduct = typeof products.$inferSelect;

export type InsertProduct = typeof products.$inferInsert;
