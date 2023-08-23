import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @Type(() => Number)
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 0,
  })
  @IsNotEmpty()
  @Max(101)
  limit: number;

  @Type(() => Number)
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 0,
  })
  @IsNotEmpty()
  @Min(1)
  page: number;
}
