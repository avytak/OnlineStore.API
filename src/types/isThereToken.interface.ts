import { Request } from 'express';

export interface IsThereTokenResponse extends Request {
  token?: string;
}
