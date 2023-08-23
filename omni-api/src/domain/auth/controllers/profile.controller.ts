import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserRepository } from '@domain/auth/repositories/user.repository';
import { ProfileGetDto } from '@domain/auth/dtos/profile-get.dto';
import { AuthenticatedGuard } from '@domain/auth/guards/authenticated.guard';
import { randomUUID } from 'crypto';
import { RequestWithUserToken } from '@domain/auth/models/request-with-user-token';

@Controller()
@UseGuards(AuthenticatedGuard)
export class ProfileController {
  constructor(private readonly userRepo: UserRepository) {}

  @Get('/profile')
  async getProfile(@Req() req: RequestWithUserToken): Promise<ProfileGetDto> {
    const user = await this.userRepo.findOneByOrFail({
      uuid: req.user.uuid ?? randomUUID(),
    });

    return new ProfileGetDto(user.firstName, user.lastName, user.email);
  }
}
