import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const databaseOptions: PostgresConnectionOptions = {
  type: 'postgres',
  host: String(process.env.DB_HOST),
  port: Number(process.env.DB_PORT),
  username: String(process.env.DB_USERNAME),
  password: String(process.env.DB_PASSWORD),
  database: String(process.env.DB_NAME),
  dropSchema: false,
  entities: ['src/domain/**/*.entity.ts'],
  migrations: ['src/infrastructure/database/migrations/*{.ts,.js}'],
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: false,
};

export const dataSource = new DataSource(databaseOptions);
