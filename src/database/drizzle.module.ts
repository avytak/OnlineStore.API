import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { DrizzleDB } from '@app/database/drizzle';
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from './schema';

export const DRIZZLE = Symbol('drizzle-connection');
config({ path: `.env.${process.env.NODE_ENV || 'production'}` });

@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const connectionString = configService.get<string>('DATABASE_URL');
        const pool = new Pool({
          connectionString,
          ssl: connectionString.includes('neon.tech')
            ? { rejectUnauthorized: false }
            : false,
        });

        return drizzle(pool, { schema }) as DrizzleDB;
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
