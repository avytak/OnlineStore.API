import { Injectable, NestMiddleware } from '@nestjs/common';

import { SelectUser } from '@app/drizzle/schema/users.schema';
import { hash } from 'bcrypt';
import { NextFunction, Request, Response } from 'express';

interface RequestWithBody extends Request {
  body: SelectUser;
}

@Injectable()
export default class UsersHashPasswordMiddleware implements NestMiddleware {
  async use(req: RequestWithBody, res: Response, next: NextFunction) {
    if (req.body?.password) {
      const password: string = req.body.password;
      try {
        req.body.password = await hash(password, 10);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    }
    next();
  }
}
