import { JwtPayload } from 'jsonwebtoken';

export interface AuthBodyType {
  email: string;
  password: string;
}

export interface MyJwtPayloadType extends JwtPayload {
  id: number;
  email: string;
}
