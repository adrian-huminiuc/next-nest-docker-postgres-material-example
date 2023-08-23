import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticatedGuard } from '@domain/auth/guards/authenticated.guard';
import { EventSubscriptionGetDto } from '@domain/events/dtos/event-subscription-get.dto';
import { EventSubscriptionApiService } from '@domain/events/services/event-subscription-api.service';
import { RequestWithUserToken } from '@domain/auth/models/request-with-user-token';
import { EventSubscriptionsGetQueryDto } from '@domain/events/dtos/event-subscriptions-get-query.dto';
import { EventSubscriptionEntity } from '@domain/events/entities/event-subscription.entity';
import { EntityByIdPipe } from '@infrastructure/framework/pipes/entity-by-uuid.pipe';
import { RequestActionDto } from '@infrastructure/framework/http/request-action.dto';

@Controller()
@UseGuards(AuthenticatedGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class EventSubscriptionsController {
  constructor(
    private readonly subscriptionApiService: EventSubscriptionApiService,
  ) {}

  @Get('/event-subscriptions')
  async getSubscriptions(
    @Query(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    )
    query: EventSubscriptionsGetQueryDto,
    @Req() req: RequestWithUserToken,
  ): Promise<EventSubscriptionGetDto[]> {
    return this.subscriptionApiService.getEventsList(req.user, query);
  }

  @Delete('/event-subscriptions/:uuid')
  async deleteSubscription(
    @Param('uuid', EntityByIdPipe) subscriptionEntity: EventSubscriptionEntity,
    @Req() req: RequestWithUserToken,
  ): Promise<RequestActionDto> {
    return this.subscriptionApiService.deleteSubscription(
      subscriptionEntity,
      req.user,
    );
  }
}
