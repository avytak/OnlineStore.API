import { Inject, Injectable } from '@nestjs/common';
import { users } from '../db/schema';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(@Inject('DRIZZLE_DB') private readonly db: NeonHttpDatabase) {}

  async findAll() {
    return this.db.select().from(users);
  }
  async findOne(id: string) {
    const result = await this.db.select().from(users).where(eq(users.id, id));

    // Перевіряємо, чи є запис
    if (result.length === 0) {
      throw new Error(`User with id ${id} not found`);
    }

    return result[0]; // Повертаємо перший запис
  }

  async create(user: { name: string; email: string; age: number }) {
    return this.db.insert(users).values(user).returning();
  }
}
