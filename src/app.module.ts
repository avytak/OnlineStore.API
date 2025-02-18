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

import { ProductModule } from './modules/product/product.module';
import { UserAddressModule } from './modules/user-address/user-address.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      isGlobal: true,
    }),
    DrizzleModule,
    OrdersModule,
    UsersModule,
    ProductModule,
    UserAddressModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
