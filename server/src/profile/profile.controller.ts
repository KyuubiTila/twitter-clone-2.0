import {
  Controller,
  Body,
  UseGuards,
  Param,
  ParseIntPipe,
  Get,
  Patch,
  Post,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetAuthenticatedUser } from 'src/auth/get-authenticated-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';

@Controller('profile')
@UseGuards(AuthGuard())
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('/')
  async createProfile(
    @GetAuthenticatedUser() user: User,
    @Body() createProfileDto: CreateProfileDto,
  ): Promise<boolean> {
    return await this.profileService.createProfile(user, createProfileDto);
  }

  @Get(':profileId')
  async getProfileById(
    @Param('profileId') profileId: number,
  ): Promise<Profile> {
    return await this.profileService.getProfileById(profileId);
  }

  @Patch(':profileId')
  async updateProfile(
    @GetAuthenticatedUser() user: User,
    @Param('profileId', ParseIntPipe) profileId: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<boolean> {
    return await this.profileService.updateProfile(
      user,
      profileId,
      updateProfileDto,
    );
  }

  // DELETE PROFILE BY ID
  @Delete(':profileId')
  async deleteProfile(
    @GetAuthenticatedUser() user: User,
    @Param('profileId') profileId: number,
  ): Promise<boolean> {
    return await this.profileService.deleteProfile(user, profileId);
  }
}
