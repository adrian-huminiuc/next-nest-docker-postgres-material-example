import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '@domain/auth/entities/user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(readonly dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }
}
