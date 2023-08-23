import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from '@domain/auth/controllers/auth.controller';
import { UserEntity } from '@domain/auth/entities/user.entity';
import { UserRepository } from '@domain/auth/repositories/user.repository';
import { AuthService } from '@domain/auth/services/auth.service';
import { ProfileController } from '@domain/auth/controllers/profile.controller';
import { AuthenticatedGuard } from '@domain/auth/guards/authenticated.guard';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserRepository, AuthService, AuthenticatedGuard],
  controllers: [AuthController, ProfileController],
  exports: [UserRepository],
})
export class AuthModule {}
