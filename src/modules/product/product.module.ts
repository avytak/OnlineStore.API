import { Module } from '@nestjs/common';

import { DrizzleModule } from '@app/database/drizzle.module';

import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  imports: [DrizzleModule],
})
export class ProductModule {}
