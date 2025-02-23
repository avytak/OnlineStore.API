import { Module } from '@nestjs/common';

import { CloudinaryModule } from '@app/cloudinary/cloudinary.module';
import { DrizzleModule } from '@app/database/drizzle.module';

import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';

@Module({
  imports: [DrizzleModule, CloudinaryModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
