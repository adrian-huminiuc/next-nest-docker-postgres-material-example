import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { AUTH_COOKIE_NAME } from '@domain/auth/constants';
import { InvalidAuthException } from '@infrastructure/framework/guards/exceptions/invalid-auth.exception';

@Catch(InvalidAuthException)
export class InvalidAuthExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(this.constructor.name);

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response
      .clearCookie(AUTH_COOKIE_NAME)
      .json({
        message: 'INVALID AUTH - MUST AUTHENTICATE AGAIN',
      })
      .status(HttpStatus.UNAUTHORIZED);
  }
}
