import { PartialType } from '@nestjs/swagger';

import { Product } from './create-product.dto';

export class UpdateProductDto extends PartialType(Product) {}
