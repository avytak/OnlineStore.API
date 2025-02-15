import { ApiProperty } from '@nestjs/swagger';

import { InsertUser } from '@app/database/schema';

export class CreateUserDto
  implements Omit<InsertUser, 'firstName' | 'lastName'>
{
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
