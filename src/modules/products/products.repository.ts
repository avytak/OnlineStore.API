import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';

import { BaseRepository } from '@app/common/repositories/base.repository';
import { DrizzleDB } from '@app/database/drizzle';
import { DRIZZLE } from '@app/database/drizzle.module';

import { products } from './products.schema';

@Injectable()
export class ProductsRepository extends BaseRepository<typeof products> {
  constructor(@Inject(DRIZZLE) db: DrizzleDB) {
    super(db, products);
  }
}
