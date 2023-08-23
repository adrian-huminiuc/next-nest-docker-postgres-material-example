import { Transform, Type } from 'class-transformer';

export class EventSubscriptionGetDto {
  @Type(() => String)
  id: string;

  @Type(() => String)
  eventName: string;

  @Type(() => String)
  @Transform(
    (params) =>
      `${params.value.toLocaleDateString(
        'de',
      )} ${params.value.toLocaleTimeString('de')}`,
  )
  eventDate: Date;

  @Type(() => String)
  @Transform(
    (params) =>
      `${params.value.toLocaleDateString(
        'de',
      )} ${params.value.toLocaleTimeString('de')}`,
  )
  createdAt: Date;
}
