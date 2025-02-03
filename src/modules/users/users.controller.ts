import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { InsertUser, SelectUser } from '@app/drizzle/schema/users.schema';
import { AuthBodyType } from '@app/modules/users/types/types';
import { UsersService } from '@app/modules/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() body: InsertUser): Promise<InsertUser> {
    return this.usersService.create(body);
  }

  @Get()
  findAll(
    @Query('page') page: string,
    @Query('limit') limit: string
  ): Promise<SelectUser[]> {
    return this.usersService.findAll(+page, +limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<SelectUser> {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  updata(@Param('id') id: string, @Body() body: SelectUser) {
    return this.usersService.updata(+id, body);
  }

  @Post('login')
  login(@Body() body: AuthBodyType): Promise<string> {
    return this.usersService.login(body);
  }

  @Post('logout')
  logout(@Body('email') email: string): Promise<void> {
    return this.usersService.logout(email);
  }
}
