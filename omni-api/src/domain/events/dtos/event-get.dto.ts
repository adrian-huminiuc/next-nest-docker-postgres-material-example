import { Type } from 'class-transformer';

export class EventGetDto {
  @Type(() => String)
  id: string;

  @Type(() => String)
  name: string;

  @Type(() => String)
  description: string;

  @Type(() => String)
  type: string;

  @Type(() => String)
  date: Date;
}
