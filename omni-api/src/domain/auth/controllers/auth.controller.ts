import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthenticateDto } from '@domain/auth/dtos/authenticate.dto';
import { AuthService } from '@domain/auth/services/auth.service';
import { encryptString } from '@infrastructure/crypto/crypto';
import { AUTH_COOKIE_NAME } from '@domain/auth/constants';

@Controller()
export class AuthController {
  private logger = new Logger(this.constructor.name);

  constructor(private readonly authService: AuthService) {}

  @Post('authenticate')
  async login(
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    authDto: AuthenticateDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const { user, passwordMatches } = await this.authService.authenticate(
      authDto.email,
      authDto.password,
    );

    if (!passwordMatches) {
      res.status(HttpStatus.BAD_REQUEST).send({
        statusCode: HttpStatus.BAD_REQUEST,
        message: [
          { property: 'password', constraint: 'Passwords do not match!' },
        ],
      });
      return;
    }

    this.logger.log(`User [${user.uuid}] authenticated successfully!`);

    res
      .cookie(
        AUTH_COOKIE_NAME,
        encryptString(JSON.stringify({ uuid: user.uuid })),
        {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: 100 * 60 * 60 * 1000,
        },
      )
      .status(HttpStatus.OK)
      .send({ status: 'authenticated', statusCode: HttpStatus.OK });
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res
      .clearCookie(AUTH_COOKIE_NAME)
      .status(HttpStatus.OK)
      .send({ status: 'authenticated', statusCode: HttpStatus.OK });
  }
}
