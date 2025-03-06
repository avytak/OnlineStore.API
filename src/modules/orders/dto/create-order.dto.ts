import { ApiProperty } from '@nestjs/swagger';

import { InsertOrder, SelectOrder } from '@app/database/schema';

import { Status } from './../../../types/orders';

export class CreateOrderDto implements InsertOrder {
  @ApiProperty({
    description: 'totalPrice',
    example: '50 - 100000',
  })
  totalPrice: string;
  status: string;
  firstName: string;
  lastName: string;
  phone: string;
  shippingAddress: string;
  paymentType: string;
  userId: number;
}

export class SelectOrderDto implements SelectOrder {
  userId: number;
  @ApiProperty({
    description: 'id',
    example: 2,
  })
  id: number;
  createdAt: Date;
  updatedAt: Date;
  totalPrice: string;
  status: Status;
  firstName: string;
  lastName: string;
  phone: string;
  shippingAddress: string;
  paymentType: string;
}
