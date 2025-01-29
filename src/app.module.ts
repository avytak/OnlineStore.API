import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ProductsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
