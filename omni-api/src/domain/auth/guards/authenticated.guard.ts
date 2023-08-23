import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { decryptString } from '@infrastructure/crypto/crypto';
import { InvalidAuthException } from '@infrastructure/framework/guards/exceptions/invalid-auth.exception';
import { UserRepository } from '@domain/auth/repositories/user.repository';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private readonly userRepo: UserRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.cookies.access_token) {
      throw new InvalidAuthException();
    }

    let token = null;
    try {
      token = JSON.parse(decryptString(request.cookies.access_token));
    } catch (e) {
      throw new InvalidAuthException();
    }

    if (!token.uuid) {
      throw new InvalidAuthException();
    }

    const user = await this.userRepo.findOneBy({
      uuid: token.uuid ?? randomUUID(),
    });

    if (!user) {
      throw new InvalidAuthException();
    }

    request.user = user;
    return true;
  }
}
