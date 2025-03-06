import { HttpException, HttpStatus } from '@nestjs/common';

import { CreateUserDto } from '@app/modules/users/dto/user-create.dto';
import { payload } from '@app/modules/users/helpers/payload';
import { SelectUser } from '@app/modules/users/users.schema';
import { compare } from 'bcryptjs';
import 'dotenv/config';
import { sign } from 'jsonwebtoken';

export async function createToken(
  body: CreateUserDto,
  user: SelectUser
): Promise<string> {
  const isPassword: boolean | Error = await compare(
    body.password,
    user.password
  );
  if (!isPassword) {
    throw new HttpException(
      'Invalid email or password',
      HttpStatus.BAD_REQUEST
    );
  }
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new HttpException(
      'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
  return sign(payload(user), JWT_SECRET, { expiresIn: '23h' });
}
