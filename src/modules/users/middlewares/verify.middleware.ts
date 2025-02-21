import { Inject, Injectable, NestMiddleware } from '@nestjs/common';

import { DrizzleDB } from '@app/database/drizzle';
import { DRIZZLE } from '@app/database/drizzle.module';
import { SelectUser, users } from '@app/database/schema';
import { UsersRepository } from '@app/modules/users/users.repository';
import { eq } from 'drizzle-orm';
import { NextFunction, Request, Response } from 'express';

interface RequestWithBody extends Request {
  verificationCode: string;
}

@Injectable()
export default class VerifyMiddleware implements NestMiddleware {
  constructor(
    private readonly usersRepository: UsersRepository,
    @Inject(DRIZZLE) private readonly db: DrizzleDB
  ) {}
  async use(req: RequestWithBody, res: Response, next: NextFunction) {
    const myUrl = new URL(`${req.protocol}://${req.get('host')}${req.url}`);
    if (!myUrl.search.includes('verificationCode')) {
      req.verificationCode = null;
      res.redirect(301, '/users');
      return next();
    }

    const id = myUrl.searchParams.get('id');
    const password = myUrl.searchParams.get('verificationCode');
    const existingUser: SelectUser[] = await this.db
      .select()
      .from(users)
      .where(eq(users.password, password));

    if (!existingUser[0]) {
      return next();
    }
    await this.usersRepository.update(+id, { isVerify: true });
    next();
  }
}
