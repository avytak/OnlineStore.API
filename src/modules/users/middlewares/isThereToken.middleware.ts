import { Injectable, NestMiddleware } from '@nestjs/common';

import { IsThereTokenResponse } from '@app/types/isThereToken.interface';
import { NextFunction, Response } from 'express';

@Injectable()
export default class IsThereTokenMiddleware implements NestMiddleware {
  use(req: IsThereTokenResponse, res: Response, next: NextFunction) {
    const myUrl = new URL(`${req.protocol}://${req.get('host')}${req.url}`);
    if (!myUrl.search.includes('token')) {
      req.token = null;
      return next();
    }
    const token = myUrl.searchParams.get('token');
    req.token = token;
    next();
  }
}
