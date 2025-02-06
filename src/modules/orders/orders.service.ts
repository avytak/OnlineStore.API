import { Inject, Injectable } from '@nestjs/common';

import { DrizzleDB } from '@app/database/drizzle';
import { DRIZZLE } from '@app/database/drizzle.module';
import {
  InsertOrder,
  SelectOrder,
  orders,
} from '@app/modules/orders/orders.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class OrdersService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(createOrderDto: InsertOrder) {
    await this.db.insert(orders).values(createOrderDto);

    return 'This action adds a new order';
  }

  async findOne(id: SelectOrder['id']): Promise<SelectOrder> {
    try {
      const ordersData: SelectOrder[] = await this.db
        .select()
        .from(orders)
        .where(eq(orders.id, id))
        .limit(1);
      return ordersData.length > 0 ? ordersData[0] : null;
    } catch (error) {
      const typedError = error as Error;
      console.error(typedError.message);
    }
  }

  async findAll() {
    return await this.db.select().from(orders);
  }

  async update(id: SelectOrder['id'], data: Partial<Omit<SelectOrder, 'id'>>) {
    await this.db.update(orders).set(data).where(eq(orders.id, id));
  }

  async remove(id: SelectOrder['id']): Promise<void> {
    await this.db.delete(orders).where(eq(orders.id, id));
  }
}
