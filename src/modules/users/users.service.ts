import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { DrizzleDB } from '@app/database/drizzle';
import { DRIZZLE } from '@app/database/drizzle.module';
import {
  CreateUserDto,
  UpdateUserDto,
} from '@app/modules/users/dto/user-create.dto';
import { authVerify } from '@app/modules/users/helpers/authVerify';
import { createToken } from '@app/modules/users/helpers/createToken';
import { payload } from '@app/modules/users/helpers/payload';
import { UsersRepository } from '@app/modules/users/users.repository';
import { SelectUser, users } from '@app/modules/users/users.schema';
import { ExpressRequestInterface } from '@app/types/expressRequest.interface';
import { MyJwtPayloadType } from '@app/types/user';
import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(DRIZZLE) private db: DrizzleDB,
    private readonly usersRepository: UsersRepository
  ) {}

  async login(body: CreateUserDto): Promise<string> {
    const { email } = body;
    const user = await this.usersRepository.findOne({
      where: eq(users, {
        email,
      }),
    });
    if (!user) {
      console.log(!!user);
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST
      );
    }
    if (!user.isVerify) {
      throw new HttpException(
        'Your authorization is not confirmed',
        HttpStatus.UNAUTHORIZED
      );
    }
    const token = await createToken(body, user);
    return token;
  }

  async signup(body: CreateUserDto): Promise<CreateUserDto> {
    const BASE_URL = this.configService.get<string>('BASE_URL');
    const { email } = body;
    const existingUser = await this.usersRepository.findOne({
      where: eq(users, {
        email,
      }),
    });
    if (existingUser) {
      throw new HttpException(
        { message: 'Such a user already exists.' },
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }
    const user = await this.usersRepository.create(body);
    const emailSended = {
      receiver: email,
      markup: `<a target="_blank" href="${BASE_URL}/users/verify?verificationCode=${user.password}&id=${user.id}">Confirm authorization</a>`,
      theme: 'Verify email',
    };
    await authVerify(emailSended);
    return user;
  }

  async findOne(id: string): Promise<SelectUser> {
    const user = await this.usersRepository.findById(+id);
    delete user.password;
    return user;
  }

  async update(
    req: ExpressRequestInterface,
    body: UpdateUserDto
  ): Promise<SelectUser> {
    if (!req.headers.authorization) {
      throw new HttpException('There is no token', HttpStatus.UNAUTHORIZED);
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
      const userPayload = verify(
        token,
        this.configService.get<string>('JWT_SECRET')
      );
      const { id } = userPayload as MyJwtPayloadType;
      const user = await this.usersRepository.update(+id, body);
      delete user.password;
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async confirmAuth(verificationCode: string) {
    if (!verificationCode) {
      throw new HttpException(
        'There is no Your authorization code',
        HttpStatus.UNAUTHORIZED
      );
    }
    const existingUser: SelectUser[] = await this.db
      .select()
      .from(users)
      .where(eq(users.password, verificationCode));

    if (!existingUser[0]) {
      throw new HttpException(
        'Your authorization is not correct',
        HttpStatus.UNAUTHORIZED
      );
    }
    await this.usersRepository.update(existingUser[0].id, { isVerify: true });
  }

  async sendToken(email: string) {
    const user = await this.usersRepository.findOne({
      where: eq(users, {
        email,
      }),
    });
    if (!user) {
      throw new HttpException(
        'There is no such email',
        HttpStatus.UNAUTHORIZED
      );
    }
    const token = sign(
      payload(user),
      this.configService.get<string>('JWT_SECRET'),
      { expiresIn: '23h' }
    );
    const notify = {
      receiver: user.email,
      markup: `<a target="_blank" href="${this.configService.get<string>('BASE_URL')}/users?token=${token}">Confirm authorization</a>`,
      theme: 'Verify email',
    };
    await authVerify(notify);
  }
}
