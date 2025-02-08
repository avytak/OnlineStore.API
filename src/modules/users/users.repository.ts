import { Inject, Injectable } from '@nestjs/common';

import { BaseRepository } from '@app/common/repositories/base.repository';
import { DrizzleDB } from '@app/database/drizzle';
import { DRIZZLE } from '@app/database/drizzle.module';
import { users } from '@app/database/schema';

@Injectable()
export class UsersRepository extends BaseRepository<typeof users> {
  constructor(@Inject(DRIZZLE) db: DrizzleDB) {
    super(db, users);
  }
}
