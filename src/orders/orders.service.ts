import { Inject, Injectable } from '@nestjs/common';

import { DRIZZLE } from '@app/drizzle/drizzle.module';
import { InsertOrder, orders } from '@app/drizzle/schema/orders.schema';
import { DrizzleDB } from '@app/drizzle/types/drizzle';
import { UpdateOrderDto } from '@app/orders/dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(createOrderDto: InsertOrder) {
    await this.db.insert(orders).values(createOrderDto);

    return 'This action adds a new order';
  }

  async findAll() {
    return await this.db.select().from(orders);
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    console.log(updateOrderDto);
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
