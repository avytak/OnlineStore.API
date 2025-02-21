// src/repositories/base.repository.ts
import { Inject, Injectable } from '@nestjs/common';

import { DrizzleDB } from '@app/database/drizzle';
import { DRIZZLE } from '@app/database/drizzle.module';
import { InferInsertModel, eq } from 'drizzle-orm';
import { InferSelectModel } from 'drizzle-orm';
import { PgTable, TableConfig } from 'drizzle-orm/pg-core';

@Injectable()
export class BaseRepository<T extends PgTable> {
  constructor(
    @Inject(DRIZZLE) protected readonly db: DrizzleDB,
    private readonly table: PgTable<TableConfig>
  ) {}

  async findAll(): Promise<InferSelectModel<T>[]> {
    return this.db
      .select()
      .from(this.table)
      .then((res) => res.map((row) => row as InferSelectModel<T>));
  }
  async findById(id: number): Promise<InferSelectModel<T> | undefined> {
    return this.db
      .select()
      .from(this.table)
      .where(eq(this.table['id'], id))
      .then((res) => res[0] as InferSelectModel<T> | undefined);
  }
  async findByEmail(email: string): Promise<InferSelectModel<T> | undefined> {
    return this.db
      .select()
      .from(this.table)
      .where(eq(this.table['email'], email))
      .then((res) => res[0] as InferSelectModel<T> | undefined);
  }
  async create(
    data: Omit<InferInsertModel<T>, 'id'>
  ): Promise<InferSelectModel<T>> {
    const result = await this.db.insert(this.table).values(data).returning();
    return result[0] as InferSelectModel<T>;
  }

  async update(
    id: number,
    data: Partial<InferInsertModel<T>>
  ): Promise<InferSelectModel<T> | undefined> {
    const result = await this.db
      .update(this.table)
      .set(data)
      .where(eq(this.table['id'], id))
      .returning();

    return result[0] as InferSelectModel<T>;
  }

  async delete(id: number): Promise<void> {
    await this.db.delete(this.table).where(eq(this.table['id'], id));
  }
}
