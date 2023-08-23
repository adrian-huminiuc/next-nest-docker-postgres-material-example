import { Type } from 'class-transformer';

export class RequestActionDto {
  @Type(() => String)
  status: 'ok' | 'no';
}
