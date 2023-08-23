import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ValidationError } from 'class-validator';
import { validationErrorToBadRequestException } from '@infrastructure/framework/pipes/detailed-validation.pipe';

@Injectable()
export class ValidationErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      catchError((err) => {
        if (Array.isArray(err) && err[0] instanceof ValidationError) {
          return throwError(() => validationErrorToBadRequestException(err));
        }
        return throwError(() => err);
      }),
    );
  }
}
