import { Injectable } from '@nestjs/common';
import { EventRepository } from '@domain/events/repositories/event.repository';
import { EventEntityToDtoFactory } from '@domain/events/factories/event-entity-to-dto.factory';
import { EventGetDto } from '@domain/events/dtos/event-get.dto';
import { PaginationDto } from '@infrastructure/helpers/pagination.dto';

@Injectable()
export class EventsApiService {
  constructor(
    private readonly eventsRepo: EventRepository,
    private readonly dtoFactory: EventEntityToDtoFactory,
  ) {}

  async getEventsList(pagination: PaginationDto): Promise<EventGetDto[]> {
    const results = [];
    for (const it of await this.eventsRepo.getList(pagination)) {
      results.push(await this.dtoFactory.makeDto(it));
    }

    return results;
  }
}
