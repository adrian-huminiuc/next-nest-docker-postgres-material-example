import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from '@domain/events/entities/event.entity';
import { EventSubscriptionEntity } from '@domain/events/entities/event-subscription.entity';
import { EventTypeEntity } from '@domain/events/entities/event-type.entity';
import { EventRepository } from '@domain/events/repositories/event.repository';
import { EventController } from '@domain/events/controllers/event.controller';
import { UserEntity } from '@domain/auth/entities/user.entity';
import { EventTypesController } from '@domain/events/controllers/event-types.controller';
import { EventTypesRepository } from '@domain/events/repositories/event-types.repository';
import { EventEntityToDtoFactory } from '@domain/events/factories/event-entity-to-dto.factory';
import { EventsApiService } from '@domain/events/services/events-api.service';
import { UserRepository } from '@domain/auth/repositories/user.repository';
import { EventSubscriptionEntityToDtoFactory } from '@domain/events/factories/event-subscription-entity-to-dto.factory';
import { EventSubscriptionsRepository } from '@domain/events/repositories/event-subscriptions.repository';
import { EventSubscriptionApiService } from '@domain/events/services/event-subscription-api.service';
import { EventSubscriptionsController } from '@domain/events/controllers/event-subscriptions.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EventEntity,
      EventSubscriptionEntity,
      EventTypeEntity,
      UserEntity,
    ]),
  ],
  controllers: [
    EventController,
    EventTypesController,
    EventSubscriptionsController,
  ],
  providers: [
    EventRepository,
    EventTypesRepository,
    EventEntityToDtoFactory,
    EventsApiService,
    EventSubscriptionApiService,
    UserRepository,
    EventSubscriptionsRepository,
    EventSubscriptionEntityToDtoFactory,
  ],
  exports: [EventRepository, EventTypesRepository],
})
export class EventsModule {}
