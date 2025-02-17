import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Description of Product name',
    example: 'Product name',
    required: true,
  })
  name: string;
  description?: string;
  price: string;
  discountPrice?: string;
  // category?: string;
  imageUrl?: string;
}
