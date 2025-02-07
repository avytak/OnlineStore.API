import { Module } from '@nestjs/common';

import { DrizzleModule } from '@app/database/drizzle.module';
import { OrdersController } from '@app/modules/orders/orders.controller';
import { OrdersRepository } from '@app/modules/orders/orders.repository';
import { OrdersService } from '@app/modules/orders/orders.service';

@Module({
  imports: [DrizzleModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
