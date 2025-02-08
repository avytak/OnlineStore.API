import { Injectable } from '@nestjs/common';

import { OrdersRepository } from '@app/modules/orders/orders.repository';
import { InsertOrder, SelectOrder } from '@app/modules/orders/orders.schema';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async create(createOrderDto: InsertOrder) {
    await this.ordersRepository.create(createOrderDto);
    return 'This action adds a new order';
  }

  async findOne(id: SelectOrder['id']): Promise<SelectOrder> {
    return await this.ordersRepository.findById(id);
  }

  async findAll() {
    return await this.ordersRepository.findAll();
  }

  async update(id: SelectOrder['id'], data: Partial<Omit<SelectOrder, 'id'>>) {
    await this.ordersRepository.update(id, data);
  }

  async delete(id: SelectOrder['id']): Promise<void> {
    await this.ordersRepository.delete(id);
  }
}
