import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { db } from '../db'; // Імпортуємо об'єкт db

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'DRIZZLE_DB',
      useValue: db, // Додаємо Drizzle як NestJS провайдера
    },
  ],
  exports: ['DRIZZLE_DB'],
})
export class UsersModule {}
