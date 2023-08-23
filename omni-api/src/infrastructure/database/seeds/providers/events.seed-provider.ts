import {EntityManager} from 'typeorm';
import {EventTypeEntity} from '@domain/events/entities/event-type.entity';
import {EventEntity} from '@domain/events/entities/event.entity';
import {random, range} from '@infrastructure/helpers/array.helper';
import {faker} from '@faker-js/faker';

export const loadEvents = async (
    em: EntityManager,
    eventTypes: EventTypeEntity[],
): Promise<EventEntity[]> => {
    const events = [];
    for (const it of range(0, 25)) {
        events.push(await em.save(
            em.create(EventEntity, {
                name: `NAME of event #${it}`,
                eventTypeUuid: random(eventTypes).uuid,
                description: faker.lorem.text(),
                date: random([0, 1]) ? faker.date.future() : faker.date.past(),
            })
        ))
    }

    return events;
};
