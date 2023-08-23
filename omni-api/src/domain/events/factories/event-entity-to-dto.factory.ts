import { Injectable } from '@nestjs/common';
import { EventGetDto } from '@domain/events/dtos/event-get.dto';
import { EventEntity } from '@domain/events/entities/event.entity';

@Injectable()
export class EventEntityToDtoFactory {
  async makeDto(event: EventEntity): Promise<EventGetDto> {
    const dto = new EventGetDto();
    dto.id = event.uuid;
    dto.name = event.name;
    dto.description = event.description;
    dto.type = (await event.eventType).name;
    dto.date = event.date;

    return dto;
  }
}
