import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { DRIZZLE } from '@app/drizzle/drizzle.module';
import { InsertUser, SelectUser, users } from '@app/drizzle/schema';
import { DrizzleDB } from '@app/drizzle/types/drizzle';
import { createToken } from '@app/modules/users/helpers/createToken';
import 'dotenv/config';
import { eq, or } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async login(body: SelectUser): Promise<string> {
    const user: SelectUser[] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, body.email));
    if (!user[0]) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    const token = await createToken(body, user[0]);
    return token;
  }

  async signup(body: InsertUser): Promise<InsertUser | null> {
    const existingUser: SelectUser[] = await this.db
      .select()
      .from(users)
      .where(
        or(eq(users.email, body.email), eq(users.firstName, body.firstName)),
      );
    if (existingUser[0]) {
      throw new HttpException(
        { message: 'Такий користувач вже існує' },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const [user] = await this.db.insert(users).values(body).returning();
    delete user.password;
    return user || null;
  }

  async findOne(id: number): Promise<SelectUser> {
    const user: SelectUser[] = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id));
    delete user[0].password;
    return user[0];
  }

  async updata(id: number | undefined, body: SelectUser): Promise<SelectUser> {
    const updatedUser = await this.db
      .update(users)
      .set(body)
      .where(eq(users.id, id))
      .returning();

    delete updatedUser[0].password;

    return updatedUser[0];
  }
}
