import { Module } from '@nestjs/common';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { EventsModule } from '@domain/events/events.module';
import { AuthModule } from '@domain/auth/auth.module';

@Module({
  imports: [InfrastructureModule, EventsModule, AuthModule],
})
export class AppModule {}
