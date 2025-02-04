import { Module } from '@nestjs/common';

import { DrizzleModule } from '@app/database/drizzle.module';
import { OrdersController } from '@app/modules/orders/orders.controller';
import { OrdersService } from '@app/modules/orders/orders.service';

@Module({
  imports: [DrizzleModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
