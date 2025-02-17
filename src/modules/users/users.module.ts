import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { DrizzleModule } from '@app/database/drizzle.module';
import { HashPassword } from '@app/modules/users/middlewares';
import { IsThereTokenMiddleware } from '@app/modules/users/middlewares/isThereToken.middleware';
import { UsersRepository } from '@app/modules/users/users.repository';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [DrizzleModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HashPassword)
      .forRoutes({ path: 'users', method: RequestMethod.POST });
    consumer
      .apply(IsThereTokenMiddleware)
      .forRoutes({ path: 'users/*', method: RequestMethod.GET });
  }
}
