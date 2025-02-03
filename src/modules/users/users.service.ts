import { Inject, Injectable } from '@nestjs/common';

import { DRIZZLE } from '@app/drizzle/drizzle.module';
import {
  InsertUser,
  SelectUser,
  users,
} from '@app/drizzle/schema/users.schema';
import { DrizzleDB } from '@app/drizzle/types/drizzle';
import { authUser } from '@app/modules/users/functions/auth';
import { AuthBodyType } from '@app/modules/users/types/types';
import 'dotenv/config';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async login(body: AuthBodyType): Promise<string> {
    const user: SelectUser[] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, body.email));
    const token = await authUser(body, user[0]);
    await this.updata(user[0].id, { token: token } as SelectUser);
    return token;
  }

  async logout(email: string): Promise<void> {
    const user: SelectUser[] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email));
    await this.updata(user[0].id, { token: null } as SelectUser);
  }

  async create(body: InsertUser): Promise<InsertUser> {
    const user = await this.db.insert(users).values(body).returning();
    return user[0];
  }

  async findAll(page: number = 1, limit: number = 10): Promise<SelectUser[]> {
    return await this.db.select().from(users).limit(limit).offset(page);
  }

  async findOne(id: number): Promise<SelectUser> {
    const user: SelectUser[] = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id));
    return user[0];
  }

  async updata(id: number, body: SelectUser): Promise<SelectUser> {
    const updatedUser = await this.db
      .update(users)
      .set(body)
      .where(eq(users.id, id))
      .returning();

    return updatedUser[0];
  }
}
