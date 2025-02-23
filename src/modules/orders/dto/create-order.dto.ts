import { ApiProperty } from '@nestjs/swagger';

import { InsertOrder, SelectOrder } from '@app/database/schema';

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
}

export class SelectOrderDto implements SelectOrder {
  @ApiProperty({
    description: 'id',
    example: 2,
  })
  id: number;
  createdAt: Date;
  updatedAt: Date;
  totalPrice: string;
  status: string;
  firstName: string;
  lastName: string;
  phone: string;
  shippingAddress: string;
  paymentType: string;
}
