import { ApiProperty } from '@nestjs/swagger';

import { InsertUser } from '@app/database/schema';
import { Role } from '@app/types/user';

import { SelectUser } from '../users.schema';

export class CreateUserDto implements InsertUser {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

export class UpdateUserDto implements SelectUser {
  @ApiProperty({ required: false })
  id: number;
  @ApiProperty({ required: false })
  firstName: string;
  @ApiProperty({ required: false })
  lastName: string;
  @ApiProperty({ required: false, example: 'user, admin' })
  role: Role.ADMIN | Role.USER;
  @ApiProperty({ required: false })
  email: string;
  @ApiProperty({ required: false })
  password: string;
  @ApiProperty({ required: false })
  isVerify: boolean;
  @ApiProperty({ required: false })
  birthDay: string;
  @ApiProperty({ required: false })
  phone: string;
}
