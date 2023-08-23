import { EntityManager } from 'typeorm';
import { UserEntity } from '@domain/auth/entities/user.entity';
import * as fs from 'fs';
import { join } from 'path';
import * as bcrypt from 'bcrypt';
import parse from 'date-fns/parse';

interface ExternalUser {
  first_name: string;
  last_name: string;
  birthday: string;
  address: string;
  phone_number: string;
}

const makeUser = async (
  user: ExternalUser,
  index: number,
): Promise<UserEntity> =>
  ({
    email: `test${index}@test.de`,
    birthday: parse(user.birthday, 'dd.MM.yyyy', new Date()),
    password: await bcrypt.hash('test123', 10),
    lastName: user.last_name,
    firstName: user.first_name,
    fullAddress: user.address,
    phoneNumber: user.phone_number,
  }) as unknown as UserEntity;

export const loadUsers = async (em: EntityManager): Promise<UserEntity[]> => {
  const userDataFiles = ['1.json', '2.json', '3.json'];

  return Promise.all(
    userDataFiles.map(async (it, index) => {
      const fileData = fs.readFileSync(
        join('./src/infrastructure/database/seeds/data', it),
        {
          encoding: 'utf8',
          flag: 'r',
        },
      );
      const user = JSON.parse(fileData) as ExternalUser;
      return await em.save(em.create(UserEntity, await makeUser(user, index)));
    }),
  );
};
