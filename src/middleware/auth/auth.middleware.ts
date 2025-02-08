/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NestMiddleware } from '@nestjs/common';

import { UsersService } from '@app/modules/users/users.service';
import { ExpressRequestInterface } from '@app/types/expressRequest.interface';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}
  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      return next();
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decode = verify(token, JWT_SECRET);
      if (typeof decode === 'object' && 'id' in decode) {
        const user = await this.usersService.findOne(String(decode.id));
        req.user = user;
      } else {
        req.user = null;
      }
      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
}
