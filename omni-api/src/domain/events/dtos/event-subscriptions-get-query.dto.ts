import { PaginationDto } from '@infrastructure/helpers/pagination.dto';
import { IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class EventSubscriptionsGetQueryDto extends PaginationDto {
  @Transform((params) => params.value === 'true')
  @IsBoolean()
  pastDates: boolean;
}
