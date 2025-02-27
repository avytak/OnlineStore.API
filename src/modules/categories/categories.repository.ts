import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';

import { BaseRepository } from '@app/common/repositories/base.repository';
import { DrizzleDB } from '@app/database/drizzle';
import { DRIZZLE } from '@app/database/drizzle.module';

import { categories } from './categories.schema';

@Injectable()
export class CategoriesRepository extends BaseRepository<typeof categories> {
  constructor(@Inject(DRIZZLE) db: DrizzleDB) {
    super(db, categories);
  }
}
