import {
  Controller,
  Body,
  UseGuards,
  Param,
  ParseIntPipe,
  Get,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetAuthenticatedUser } from 'src/auth/get-authenticated-user.decorator';
import { Users } from 'src/auth/users.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';

@Controller('profile')
@UseGuards(AuthGuard())
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/:profileId')
  getProfileById(@Param('profileId') profileId: number): Promise<Profile> {
    return this.profileService.getProfileById(profileId);
  }

  @Patch('/:profileId')
  async updateProfile(
    @GetAuthenticatedUser() user: Users,
    @Param('profileId', ParseIntPipe) profileId: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    return await this.profileService.updateProfile(
      user,
      profileId,
      updateProfileDto,
    );
  }
}
