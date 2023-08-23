import { EntityManager } from 'typeorm';
import { random, range } from '@infrastructure/helpers/array.helper';
import { UserEntity } from '@domain/auth/entities/user.entity';
import { EventSubscriptionEntity } from '@domain/events/entities/event-subscription.entity';
import { EventEntity } from '@domain/events/entities/event.entity';
import { faker } from '@faker-js/faker';

export const loadSubscriptions = async (
  em: EntityManager,
  users: UserEntity[],
  events: EventEntity[],
): Promise<void> => {
  for (const {} of range(1, 150)) {
    await em.save(
      em.create(EventSubscriptionEntity, {
        eventUuid: random(events).uuid,
        userUuid: random(users).uuid,
        createdAt: faker.date.past(),
      }),
    );
  }
};
