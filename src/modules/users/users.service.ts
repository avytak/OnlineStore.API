import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { DRIZZLE } from '@app/drizzle/drizzle.module';
import { DrizzleDB } from '@app/drizzle/types/drizzle';
import { createToken } from '@app/modules/users/helpers/createToken';
import { InsertUser, SelectUser, users } from '@app/modules/users/users.schema';
import 'dotenv/config';
import { eq, or } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async login(body: SelectUser): Promise<SelectUser> {
    const user: SelectUser[] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, body.email));
    if (!user[0]) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST
      );
    }
    const token = await createToken(body, user[0]);
    await this.updata(user[0].id, { token: token } as SelectUser);
    delete user[0].password;
    return user[0];
  }

  async logout(id: number): Promise<void> {
    if (!id) return;
    const user: SelectUser[] = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id));
    await this.updata(user[0].id, { token: null } as SelectUser);
  }

  async signup(body: InsertUser): Promise<InsertUser | null> {
    const existingUser: SelectUser[] = await this.db
      .select()
      .from(users)
      .where(
        or(eq(users.email, body.email), eq(users.firstName, body.firstName))
      );
    if (existingUser[0]) {
      throw new HttpException(
        { message: 'Такий користувач вже існує' },
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }
    const [user] = await this.db.insert(users).values(body).returning();
    return user || null;
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
