import { Injectable } from '@nestjs/common';
import { db } from '../';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  async findAll() {
    return await db.select().from(users);
  }

  async findOne(id: number) {
    return await db.select().from(users).where(eq(users.id, id));
  }

  async create(name: string, email: string) {
    return await db.insert(users).values({ name, email }).returning();
  }
}
