import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { DetailedValidationPipe } from '@infrastructure/framework/pipes/detailed-validation.pipe';
import { ValidationErrorInterceptor } from '@infrastructure/framework/interceptors/validation-error.interceptor';
import { InvalidAuthExceptionFilter } from '@infrastructure/framework/filters/invalid-auth-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new InvalidAuthExceptionFilter());
  app.useGlobalPipes(new DetailedValidationPipe());
  app.useGlobalInterceptors(new ValidationErrorInterceptor());
  app.enableCors({
    origin: 'http://omni.localhost:1090',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PATCH', 'PUT', 'DELETE'],
  });
  app.use(cookieParser());
  await app.listen(Number(process.env.API_PORT));
}
bootstrap();
