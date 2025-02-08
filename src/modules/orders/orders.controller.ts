import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { InsertOrder, SelectOrder } from '@app/modules/orders/orders.schema';
import { OrdersService } from '@app/modules/orders/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':id')
  findOne(@Param('id') id: string): Promise<SelectOrder> {
    return this.ordersService.findOne(+id);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Post()
  create(@Body() createOrderDto: InsertOrder) {
    return this.ordersService.create(createOrderDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: SelectOrder
  ): Promise<void> {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.ordersService.delete(+id);
  }
}
