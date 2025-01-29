import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';

import { DrizzleModule } from './drizzle/drizzle.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    DrizzleModule,
    OrdersModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
