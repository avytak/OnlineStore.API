import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';

import { BaseRepository } from '@app/common/repositories/base.repository';
import { DrizzleDB } from '@app/database/drizzle';
import { DRIZZLE } from '@app/database/drizzle.module';

import { product } from './product.schema';

@Injectable()
export class ProductRepository extends BaseRepository<typeof product> {
  constructor(@Inject(DRIZZLE) db: DrizzleDB) {
    super(db, product);
  }
}
