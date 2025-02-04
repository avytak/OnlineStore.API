import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DrizzleModule } from './database/drizzle.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    DrizzleModule,
    OrdersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProductModule,
  ],
})
export class AppModule {}
