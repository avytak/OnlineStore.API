import { Module } from '@nestjs/common';

import { DrizzleModule } from '@app/drizzle/drizzle.module';

import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
  imports: [DrizzleModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
