import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';

import { IsAuthGuard } from '@app/guards/is-auth.guard';
import { InsertUser, SelectUser } from '@app/modules/users/users.schema';
import { UsersService } from '@app/modules/users/users.service';
import { ExpressRequestInterface } from '@app/types/expressRequest.interface';
import { last } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  currentUser(@Req() req: ExpressRequestInterface) {
    return req.user;
  }

  @Post()
  @ApiConsumes('application/json')
  @ApiBody({
    description: 'User signup',
    schema: {
      type: 'object',
      required: ['firstName', 'lastName', 'email', 'password'],
      properties: {
        firstName: { type: 'string', example: 'First name' },
        lastName: { type: 'string', example: 'Last name' },
        email: { type: 'string', example: 'user@email.com' },
        password: { type: 'string', example: 'password' },
      },
    },
  })
  @ApiOperation({ summary: 'Create a new user' })
  signup(@Body() body: InsertUser): Promise<InsertUser> {
    return this.usersService.signup(body);
  }

  @Patch()
  @UseGuards(IsAuthGuard)
  updata(@Req() req: ExpressRequestInterface, @Body() body: SelectUser) {
    return this.usersService.update(req.user.id, body);
  }

  @Post('login')
  @ApiConsumes('application/json')
  @ApiBody({
    description: 'User signup',
    schema: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string', example: 'user@email.com' },
        password: { type: 'string', example: 'password' },
      },
    },
  })
  @ApiOperation({ summary: 'Create a new user' })
  login(@Body() body: SelectUser): Promise<string> {
    return this.usersService.login(body);
  }
}
