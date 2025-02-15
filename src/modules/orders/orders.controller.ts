import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import {
  CreateOrderDto,
  SelectOrderDto,
} from '@app/modules/orders/dto/create-order.dto';
import { OrdersService } from '@app/modules/orders/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':id')
  findOne(@Param('id') id: string): Promise<SelectOrderDto> {
    return this.ordersService.findOne(+id);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: SelectOrderDto
  ): Promise<void> {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.ordersService.delete(+id);
  }
}
