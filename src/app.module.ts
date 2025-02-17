import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DrizzleModule } from '@app/database/drizzle.module';
import { AuthMiddleware } from '@app/middleware/auth/auth.middleware';
import { OrdersModule } from '@app/modules/orders/orders.module';
import { UsersModule } from '@app/modules/users/users.module';

import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      isGlobal: true,
    }),
    DrizzleModule,
    OrdersModule,
    UsersModule,
    ProductsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
