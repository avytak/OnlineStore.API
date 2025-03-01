/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpException, HttpStatus } from '@nestjs/common';

import { AuthBodyType, MyJwtPayloadType } from '@app/modules/users/types/types';
import { SelectUser } from '@app/modules/users/users.schema';
import { compare } from 'bcryptjs';
import 'dotenv/config';
import { sign } from 'jsonwebtoken';

export async function createToken(
  body: AuthBodyType,
  user: SelectUser
): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
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
  const payload: MyJwtPayloadType = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new HttpException(
      'Internal server error',
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
  return sign(payload, JWT_SECRET, { expiresIn: '23h' });
}
