import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { EventGetDto } from '@domain/events/dtos/event-get.dto';
import { AuthenticatedGuard } from '@domain/auth/guards/authenticated.guard';
import { PaginationDto } from '@infrastructure/helpers/pagination.dto';
import { EventsApiService } from '@domain/events/services/events-api.service';

@Controller()
@UseGuards(AuthenticatedGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class EventController {
  constructor(private readonly apiService: EventsApiService) {}

  @Get('/events')
  public async getEvents(
    @Query(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    )
    query: PaginationDto,
  ): Promise<EventGetDto[]> {
    return this.apiService.getEventsList(query);
  }
}
