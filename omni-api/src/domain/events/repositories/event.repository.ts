import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { EventEntity } from '@domain/events/entities/event.entity';
import { PaginationDto } from '@infrastructure/helpers/pagination.dto';

@Injectable()
export class EventRepository extends Repository<EventEntity> {
  constructor(readonly dataSource: DataSource) {
    super(EventEntity, dataSource.createEntityManager());
  }

  async getList(pagination: PaginationDto): Promise<EventEntity[]> {
    return this.createQueryBuilder('e')
      .limit(pagination.limit)
      .offset((pagination.page - 1) * pagination.limit)
      .getMany();
  }
}
