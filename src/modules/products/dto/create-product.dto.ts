import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product name',
    example: 'Product name',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'Description of Product',
    example: 'This is a very good description of product',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Product price',
    example: '100.00',
    required: true,
  })
  price: string;

  @ApiProperty({
    description: 'Product discount price',
    example: '50.00',
    required: false,
  })
  discountPrice?: string;

  @ApiProperty({
    description: 'Product category id',
    example: 1,
    required: true,
  })
  categoryId: number;

  @ApiProperty({
    description: 'Product image',
    type: 'string',
    format: 'binary',
    required: false,
  })
  image?: string;
}
