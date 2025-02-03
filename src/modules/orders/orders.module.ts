import { Module } from '@nestjs/common';

import { DrizzleModule } from '@app/drizzle/drizzle.module';
import { OrdersController } from '@app/modules/orders/orders.controller';
import { OrdersService } from '@app/modules/orders/orders.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [DrizzleModule],
})
export class OrdersModule {}
