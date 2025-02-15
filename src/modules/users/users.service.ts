import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { DrizzleDB } from '@app/database/drizzle';
import { DRIZZLE } from '@app/database/drizzle.module';
import { createToken } from '@app/modules/users/helpers/createToken';
import { UsersRepository } from '@app/modules/users/users.repository';
import { InsertUser, SelectUser, users } from '@app/modules/users/users.schema';
import 'dotenv/config';
import { eq, or } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DRIZZLE) private db: DrizzleDB,
    private readonly usersRepository: UsersRepository
  ) {}

  async login(body: SelectUser): Promise<string> {
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
    return token;
  }

  async signup(body: InsertUser): Promise<InsertUser> {
    const existingUser: SelectUser[] = await this.db
      .select()
      .from(users)
      .where(
        or(eq(users.email, body.email), eq(users.firstName, body.firstName))
      );
    if (existingUser[0]) {
      throw new HttpException(
        { message: 'Such a user already exists.' },
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }
    const [user] = await this.db.insert(users).values(body).returning();
    delete user.password;
    return user;
  }

  async findOne(id: string): Promise<SelectUser> {
    const user = await this.usersRepository.findById(+id);
    delete user.password;
    return user;
  }

  async update(id: number | undefined, body: SelectUser): Promise<SelectUser> {
    const user = await this.usersRepository.update(id, body);
    delete user.password;
    return user;
  }
}
