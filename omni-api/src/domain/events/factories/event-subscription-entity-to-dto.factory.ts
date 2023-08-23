import { Injectable } from '@nestjs/common';
import { EventSubscriptionGetDto } from '@domain/events/dtos/event-subscription-get.dto';
import { EventSubscriptionEntity } from '@domain/events/entities/event-subscription.entity';

@Injectable()
export class EventSubscriptionEntityToDtoFactory {
  async makeDto(
    subscription: EventSubscriptionEntity,
  ): Promise<EventSubscriptionGetDto> {
    const dto = new EventSubscriptionGetDto();
    dto.id = subscription.uuid;
    dto.eventDate = (await subscription.event)[0].date;
    dto.eventName = (await subscription.event)[0].name;
    dto.createdAt = subscription.createdAt;

    return dto;
  }
}
