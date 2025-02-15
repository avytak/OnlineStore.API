import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';

import { IsAuthGuard } from '@app/guards/is-auth.guard';
import { CreateUserDto } from '@app/modules/users/dto/user-create.dto';
import { SelectUser } from '@app/modules/users/users.schema';
import { UsersService } from '@app/modules/users/users.service';
import { ExpressRequestInterface } from '@app/types/expressRequest.interface';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  currentUser(@Req() req: ExpressRequestInterface) {
    return req.user;
  }

  @Post()
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid input data.',
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  signup(@Body() body: CreateUserDto): Promise<CreateUserDto> {
    return this.usersService.signup(body);
  }

  @Patch()
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. User needs to be authenticated.',
  })
  @UseGuards(IsAuthGuard)
  updata(@Req() req: ExpressRequestInterface, @Body() body: SelectUser) {
    return this.usersService.update(req.user.id, body);
  }

  @Post('login')
  @ApiConsumes('application/x-www-form-urlencoded')
  login(@Body() body: SelectUser): Promise<string> {
    return this.usersService.login(body);
  }
}
