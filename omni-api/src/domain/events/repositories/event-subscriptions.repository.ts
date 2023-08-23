import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from '@infrastructure/helpers/pagination.dto';
import { EventSubscriptionEntity } from '@domain/events/entities/event-subscription.entity';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '@domain/auth/entities/user.entity';
import { EventEntity } from '@domain/events/entities/event.entity';

@Injectable()
export class EventSubscriptionsRepository extends Repository<EventSubscriptionEntity> {
  constructor(readonly dataSource: DataSource) {
    super(EventSubscriptionEntity, dataSource.createEntityManager());
  }

  async getList(
    user: UserEntity,
    pagination: PaginationDto,
    pastDates: boolean,
  ): Promise<EventSubscriptionEntity[]> {
    return this.createQueryBuilder('s')
      .innerJoinAndMapMany('s.event', EventEntity, 'e', 's.event_uuid = e.uuid')
      .where('s.user_uuid = :userUuid', { userUuid: user.uuid })
      .andWhere(pastDates ? 'e.date < now()' : 'e.date >= now()')
      .orderBy('e.date', pastDates ? 'DESC' : 'ASC')
      .limit(pagination.limit)
      .offset((pagination.page - 1) * pagination.limit)
      .getMany();
  }
}
