import {
  BadRequestException,
  Injectable,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

export function validationErrorToBadRequestException(
  errors: ValidationError[],
) {
  const targetConstraintErrors = [];
  errors.map((it) => {
    targetConstraintErrors.push({
      property: it.property,
      constraint: Object.values(it.constraints)[0],
    });
  });
  return new BadRequestException(targetConstraintErrors);
}

@Injectable()
export class DetailedValidationPipe extends ValidationPipe {
  exceptionFactory = validationErrorToBadRequestException;
}
