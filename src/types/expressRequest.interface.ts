import { SelectUser } from '@app/modules/users/users.schema';
import { Request } from 'express';

export interface ExpressRequestInterface extends Request {
  user?: SelectUser;
}
