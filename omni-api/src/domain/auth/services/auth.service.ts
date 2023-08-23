import { Injectable } from '@nestjs/common';
import { UserRepository } from '@domain/auth/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '@domain/auth/entities/user.entity';
import { ValidationError } from 'class-validator';

@Injectable()
export class AuthService {
  constructor(private readonly userRepo: UserRepository) {}

  async authenticate(
    email: string,
    password: string,
  ): Promise<{
    user: UserEntity;
    passwordMatches: boolean;
  }> {
    let user: UserEntity;
    try {
      user = await this.userRepo.findOneByOrFail({ email });
    } catch (e) {
      const validationError = new ValidationError();
      validationError.property = 'email';
      validationError.constraints = {
        isValid: 'Invalid email and password combination',
      };
      throw [validationError];
    }

    return {
      user,
      passwordMatches: await bcrypt.compare(password, user.password),
    };
  }
}
