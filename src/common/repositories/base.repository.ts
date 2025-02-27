// src/repositories/base.repository.ts
import { Inject, Injectable } from '@nestjs/common';

import { DrizzleDB } from '@app/database/drizzle';
import { DRIZZLE } from '@app/database/drizzle.module';
import { InferInsertModel, SQL, eq } from 'drizzle-orm';
import { InferSelectModel } from 'drizzle-orm';
import { PgTable, TableConfig } from 'drizzle-orm/pg-core';

interface FindOneOptions<T extends PgTable> {
  where?: SQL<unknown>;
  with?: unknown;
  // Можна розширити options іншими параметрами findOne, якщо потрібно (with, etc.)
}

// Визначаємо інтерфейс, який розширює PgTable та явно включає name: string
interface TableWithName<TConfig extends TableConfig> extends PgTable<TConfig> {
  name: string;
}
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

  async findOneById(
    id: number,
    options: FindOneOptions<T>
  ): Promise<InferSelectModel<T> | Error | undefined> {
    const tableName = (this.table as TableWithName<TableConfig>).name;
    try {
      if (tableName in this.db.query) {
        return (await (
          this.db.query[tableName] as {
            findOne(
              options: FindOneOptions<T>
            ): Promise<InferSelectModel<T> | Error | undefined>;
          }
        ).findOne({
          where: eq(this.table['id'], id),
          with: options.with,
        })) as Promise<InferSelectModel<T> | Error | undefined>;
      } else {
        throw new Error(`Invalid table name: ${tableName}`);
      }
    } catch (error) {
      console.error(error);
    }
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
