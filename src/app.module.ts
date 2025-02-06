import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { DrizzleModule } from '@app/drizzle/drizzle.module';
import { AuthMiddleware } from '@app/middleware/auth/auth.middleware';
import { OrdersModule } from '@app/modules/orders/orders.module';
import { UsersModule } from '@app/modules/users/users.module';

import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule,
    OrdersModule,
    UsersModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
