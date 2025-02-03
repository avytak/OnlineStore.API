import { SelectUser } from '@app/drizzle/schema/users.schema';
import { AuthBodyType, AuthPayloadType } from '@app/modules/users/types/types';
import { compare } from 'bcrypt';
import 'dotenv/config';
import { sign } from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export async function authUser(
  body: AuthBodyType,
  user: SelectUser
): Promise<string> {
  const isPassword = await compare(body.password, user.password);
  if (!isPassword) {
    throw new Error('Не вірний email або пароль');
  }
  const payload: AuthPayloadType = {
    id: user.id,
    email: user.email,
  };
  return sign(payload, JWT_SECRET, { expiresIn: '23h' });
}
