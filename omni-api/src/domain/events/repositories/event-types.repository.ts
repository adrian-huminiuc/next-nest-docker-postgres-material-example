import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { EventTypeEntity } from '@domain/events/entities/event-type.entity';

@Injectable()
export class EventTypesRepository extends Repository<EventTypeEntity> {
  constructor(readonly dataSource: DataSource) {
    super(EventTypeEntity, dataSource.createEntityManager());
  }
}
