import { SelectUser } from '@app/drizzle/schema/users.schema';
import { Request } from 'express';

export interface ExpressRequestInterface extends Request {
  user?: SelectUser;
}
