import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return this.usersService.findOne(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new NotFoundException(error.message);
      }
    }
  }

  @Post()
  async create(@Body() body: { name: string; email: string; age: number }) {
    return this.usersService.create(body);
  }
}
