import { Inject, Injectable } from '@nestjs/common';

import { BaseRepository } from '@app/common/repositories/base.repository';
import { DrizzleDB } from '@app/database/drizzle';
import { DRIZZLE } from '@app/database/drizzle.module';
import { orders } from '@app/database/schema';

@Injectable()
export class OrdersRepository extends BaseRepository<typeof orders> {
  constructor(@Inject(DRIZZLE) db: DrizzleDB) {
    super(db, orders);
  }
}
