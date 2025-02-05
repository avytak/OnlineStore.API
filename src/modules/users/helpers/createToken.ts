import { HttpException, HttpStatus } from '@nestjs/common';

import { SelectUser } from '@app/drizzle/schema/users.schema';
import { AuthBodyType, MyJwtPayloadType } from '@app/modules/users/types/types';
import { compare } from 'bcrypt';
import 'dotenv/config';
import { sign } from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export async function createToken(
  body: AuthBodyType,
  user: SelectUser
): Promise<string> {
  const isPassword = await compare(body.password, user.password);
  if (!isPassword) {
    throw new HttpException(
      'Invalid email or password',
      HttpStatus.BAD_REQUEST
    );
  }
  const payload: MyJwtPayloadType = {
    id: user.id,
    email: user.email,
  };
  return sign(payload, JWT_SECRET, { expiresIn: '23h' });
}
