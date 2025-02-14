import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { DrizzleDB } from '@app/database/drizzle';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from './schema';

export const DRIZZLE = Symbol('drizzle-connection');

@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const environment = configService.get<string>('NODE_ENV');
        const connectionString = configService.get<string>('DATABASE_URL');
        const poolOptions: {
          connectionString: string;
          ssl?: boolean;
        } = {
          connectionString,
        };
        if (environment === 'production') {
          poolOptions.ssl = true;
        } else {
          poolOptions.ssl = false;
        }
        const pool = new Pool(poolOptions);

        return drizzle(pool, { schema }) as DrizzleDB;
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
