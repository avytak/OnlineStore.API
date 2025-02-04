import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DrizzleModule } from './database/drizzle.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductModule } from './modules/product/product.module';
import { AuthMiddleware } from '@app/middleware/auth/auth.middleware';

@Module({
  imports: [
    DrizzleModule,
    OrdersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProductModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
