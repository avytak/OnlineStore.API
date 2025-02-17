import { JwtPayload } from 'jsonwebtoken';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}
export interface MyJwtPayloadType extends JwtPayload {
  id: number;
  email: string;
  role: Role.ADMIN | Role.USER;
}
