import { ForbiddenException, Injectable } from '@nestjs/common';
import { EventSubscriptionsRepository } from '@domain/events/repositories/event-subscriptions.repository';
import { EventSubscriptionGetDto } from '@domain/events/dtos/event-subscription-get.dto';
import { EventSubscriptionEntityToDtoFactory } from '@domain/events/factories/event-subscription-entity-to-dto.factory';
import { UserEntity } from '@domain/auth/entities/user.entity';
import { EventSubscriptionsGetQueryDto } from '@domain/events/dtos/event-subscriptions-get-query.dto';
import { EventSubscriptionEntity } from '@domain/events/entities/event-subscription.entity';
import { RequestActionDto } from '@infrastructure/framework/http/request-action.dto';

@Injectable()
export class EventSubscriptionApiService {
  constructor(
    private readonly subscriptionsRepository: EventSubscriptionsRepository,
    private readonly dtoFactory: EventSubscriptionEntityToDtoFactory,
  ) {}

  async getEventsList(
    user: UserEntity,
    queryDto: EventSubscriptionsGetQueryDto,
  ): Promise<EventSubscriptionGetDto[]> {
    const results = [];
    const subscriptions = await this.subscriptionsRepository.getList(
      user,
      queryDto,
      queryDto.pastDates,
    );
    for (const it of subscriptions) {
      results.push(await this.dtoFactory.makeDto(it));
    }

    return results;
  }

  async deleteSubscription(
    subscription: EventSubscriptionEntity,
    owningUser: UserEntity,
  ): Promise<RequestActionDto> {
    if (
      !(await this.subscriptionsRepository.findOneBy({
        uuid: subscription.uuid,
        userUuid: owningUser.uuid,
      }))
    ) {
      throw new ForbiddenException();
    }

    await this.subscriptionsRepository.delete({
      uuid: subscription.uuid,
    });

    return { status: 'ok' };
  }
}
