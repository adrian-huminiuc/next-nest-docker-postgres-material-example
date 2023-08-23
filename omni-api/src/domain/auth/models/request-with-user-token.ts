import { Request } from 'express';
import { UserEntity } from '@domain/auth/entities/user.entity';

export interface RequestWithUserToken extends Request {
  user: UserEntity;
}
