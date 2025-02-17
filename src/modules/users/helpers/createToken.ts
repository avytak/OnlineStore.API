import { HttpException, HttpStatus } from '@nestjs/common';

import { CreateUserDto } from '@app/modules/users/dto/user-create.dto';
import { payload } from '@app/modules/users/helpers/payload';
import { SelectUser } from '@app/modules/users/users.schema';
import { compare } from 'bcryptjs';
import 'dotenv/config';
import { sign } from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export async function createToken(
  body: CreateUserDto,
  user: SelectUser
): Promise<string> {
  const isPassword: boolean | Error = await compare(
    body.password,
    user.password
  );
  if (!isPassword) {
    console.log(body.password, user.password);
    throw new HttpException(
      'Invalid email or password',
      HttpStatus.BAD_REQUEST
    );
  }

  return sign(payload(user), JWT_SECRET, { expiresIn: '23h' });
}
