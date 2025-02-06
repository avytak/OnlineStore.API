import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty({
    description: 'Description of Product name',
    example: 'Product name',
    required: true,
  })
  name: string;
  description?: string;
  price: string;
  category: string;
  imageUrl?: string;
}
