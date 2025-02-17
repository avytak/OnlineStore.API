import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Req,
  Res,
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
import { IsThereTokenResponse } from '@app/types/isThereToken.interface';
import { Response } from 'express';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  currentUser(@Req() req: ExpressRequestInterface) {
    return req.user;
  }

  @Get('verify')
  async confirmAuth(
    @Query('verificationCode') verificationCode: string,
    @Res() res: Response
  ) {
    await this.usersService.confirmAuth(verificationCode);
    res.redirect(301, '/users/login');
  }

  @Get('send_token')
  sendToken(@Body('email') email: string) {
    return this.usersService.sendToken(email);
  }
  @Get('get_token')
  updatePassword(@Req() req: IsThereTokenResponse) {
    return req.token;
  }

  @Post()
  @ApiConsumes('application/x-www-form-urlencoded')
  signup(@Body() body: CreateUserDto): Promise<CreateUserDto> {
    return this.usersService.signup(body);
  }

  @Patch()
  @ApiConsumes('application/x-www-form-urlencoded')
  @UseGuards(IsAuthGuard)
  updata(@Req() req: ExpressRequestInterface, @Body() body: UpdateUserDto) {
    return this.usersService.update(req, body);
  }

  @Post('login')
  @ApiConsumes('application/x-www-form-urlencoded')
  async login(
    @Body() body: CreateUserDto,
    @Res() res: Response
  ): Promise<void> {
    await this.usersService.login(body);
    res.redirect(301, '/');
  }
}
