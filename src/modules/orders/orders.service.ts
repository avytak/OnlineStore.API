import { Injectable } from '@nestjs/common';

import {
  CreateOrderDto,
  SelectOrderDto,
} from '@app/modules/orders/dto/create-order.dto';
import { OrdersRepository } from '@app/modules/orders/orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async create(createOrderDto: CreateOrderDto) {
    await this.ordersRepository.create(createOrderDto);
    return 'This action adds a new order';
  }

  async findOneById(
    id: SelectOrderDto['id']
  ): Promise<SelectOrderDto | Error | null> {
    const order = (await this.ordersRepository.findOneById(id, {
      with: { user: true },
    })) as SelectOrderDto | Error | null;
    if (order instanceof Error && order !== null) {
      throw new Error(order.message);
    }

    return order ?? null;
  }
  async findAll() {
    return await this.ordersRepository.findAll();
  }

  async update(
    id: SelectOrderDto['id'],
    data: Partial<Omit<SelectOrderDto, 'id'>>
  ) {
    await this.ordersRepository.update(id, data);
  }

  async delete(id: SelectOrderDto['id']): Promise<void> {
    await this.ordersRepository.delete(id);
  }
}
