import { Controller, Get, Logger } from '@nestjs/common';
import { EventTypesRepository } from '@domain/events/repositories/event-types.repository';
import { EventTypeGetDto } from '@domain/events/dtos/event-type-get.dto';

@Controller()
export class EventTypesController {
  private logger = new Logger(this.constructor.name);

  constructor(private readonly eventTypeRepository: EventTypesRepository) {}

  @Get('/events-types')
  public async getEventTypes(): Promise<EventTypeGetDto[]> {
    return (await this.eventTypeRepository.find()).map(
      (it) => new EventTypeGetDto(it.uuid, it.name),
    );
  }
}
