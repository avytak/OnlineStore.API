import {
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

// Визначення таблиці "product"
export const product = pgTable('product', {
  id: serial('id').primaryKey().unique(), // Унікальний ідентифікатор продукту
  name: varchar('name', { length: 255 }).notNull(), // Назва продукту
  description: text('description'), // Опис продукту
  price: numeric('price', { precision: 10, scale: 2 }).notNull(), // Ціна продукту
  category: varchar('category', { length: 100 }).notNull(), // Категорія продукту
  imageUrl: text('image_url'), // URL зображення продукту
  createdAt: timestamp('created_at').defaultNow(), // Дата створення запису
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()), // Дата оновлення запису
});

export type SelectProduct = typeof product.$inferSelect;

export type InsertProduct = typeof product.$inferInsert;
