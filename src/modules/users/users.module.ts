import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { DrizzleModule } from '@app/database/drizzle.module';
import { GetToken, HashPassword, Verify } from '@app/modules/users/middlewares';
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
      .forRoutes({ path: 'users/create', method: RequestMethod.POST });
    consumer
      .apply(HashPassword)
      .forRoutes({ path: 'users/update', method: RequestMethod.PATCH });
    consumer
      .apply(Verify)
      .forRoutes({ path: 'users/verify', method: RequestMethod.GET });
    consumer
      .apply(GetToken)
      .forRoutes({ path: 'users/*', method: RequestMethod.GET });
  }
}
