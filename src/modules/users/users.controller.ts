import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { IsAuthGuard } from '@app/guards/is-auth.guard';
import { InsertUser, SelectUser } from '@app/modules/users/users.schema';
import { UsersService } from '@app/modules/users/users.service';
import { ExpressRequestInterface } from '@app/types/expressRequest.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  currentUser(@Req() req: ExpressRequestInterface) {
    return req.user;
  }

  @Post()
  signup(@Body() body: InsertUser): Promise<InsertUser> {
    return this.usersService.signup(body);
  }

  @Patch()
  @UseGuards(IsAuthGuard)
  updata(@Req() req: ExpressRequestInterface, @Body() body: SelectUser) {
    return this.usersService.updata(req.user.id, body);
  }

  @Post('login')
  login(@Body() body: SelectUser): Promise<SelectUser> {
    return this.usersService.login(body);
  }

  @Post('logout')
  logout(@Req() req: ExpressRequestInterface): Promise<void> {
    return this.usersService.logout(req.user?.id);
  }
}
