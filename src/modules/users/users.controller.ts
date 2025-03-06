import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';

import { IsAuthGuard } from '@app/guards/is-auth.guard';
import {
  CreateUserDto,
  UpdateUserDto,
} from '@app/modules/users/dto/user-create.dto';
import { UsersService } from '@app/modules/users/users.service';
import { ExpressRequestInterface } from '@app/types/expressRequest.interface';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('current')
  currentUser(@Req() req: ExpressRequestInterface) {
    return req.user;
  }

  @Post('create')
  @ApiConsumes('application/x-www-form-urlencoded')
  signup(@Body() body: CreateUserDto): Promise<CreateUserDto> {
    return this.usersService.signup(body);
  }

  @Post('login')
  @ApiConsumes('application/x-www-form-urlencoded')
  async login(@Body() body: CreateUserDto): Promise<string> {
    return await this.usersService.login(body);
  }

  @Get('send_token')
  @ApiConsumes('application/x-www-form-urlencoded')
  sendToken(@Body('email') email: string) {
    return this.usersService.sendToken(email);
  }

  @Patch('update')
  @ApiConsumes('application/x-www-form-urlencoded')
  @UseGuards(IsAuthGuard)
  updata(@Req() req: ExpressRequestInterface, @Body() body: UpdateUserDto) {
    return this.usersService.update(req, body);
  }
}
