import { EntityManager } from 'typeorm';
import { EventTypeEntity } from '@domain/events/entities/event-type.entity';

export const loadEventTypes = async (
  em: EntityManager,
): Promise<EventTypeEntity[]> => {
  const eventTypes = [
    'Football ⚽',
    'Cricket 🏏',
    'Swimming 🏊',
    'Dancing 🩰',
    'Fencing 🤺',
  ];

  const eventTypesEntities = [];
  for (const it of eventTypes) {
    eventTypesEntities.push(
      await em.save(
        em.create(EventTypeEntity, {
          name: it,
        }),
      ),
    );
  }

  return eventTypesEntities;
};
