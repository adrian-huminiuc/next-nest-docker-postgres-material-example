import { Module } from '@nestjs/common';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseOptions } from '../../data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...databaseOptions,
      entities: [],
      migrations: [],
      autoLoadEntities: true,
      synchronize: false,
      namingStrategy: new SnakeNamingStrategy(),
    }),
  ],
})
export class InfrastructureModule {}
