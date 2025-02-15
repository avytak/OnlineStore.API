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

  async findOne(id: SelectOrderDto['id']): Promise<SelectOrderDto> {
    return await this.ordersRepository.findById(id);
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
