import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: `.env.${process.env.NODE_ENV || 'production'}` });

export default defineConfig({
  out: './drizzle',
  schema: './src/modules/**/**.schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
