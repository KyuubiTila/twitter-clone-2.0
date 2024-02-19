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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetAuthenticatedUser } from 'src/auth/get-authenticated-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';
import { multerOptions } from 'src/config/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('profile')
@UseGuards(AuthGuard())
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async createProfile(
    @GetAuthenticatedUser() user: User,
    @Body() createProfileDto: CreateProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<boolean> {
    console.log(file);
    return await this.profileService.createProfile(
      user,
      createProfileDto,
      file,
    );
  }

  @Get(':profileId')
  async getProfileById(
    @Param('profileId') profileId: number,
  ): Promise<Profile> {
    return await this.profileService.getProfileById(profileId);
  }

  @Patch(':profileId')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async updateProfile(
    @GetAuthenticatedUser() user: User,
    @Param('profileId', ParseIntPipe) profileId: number,
    @Body() updateProfileDto: UpdateProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<boolean> {
    return await this.profileService.updateProfile(
      user,
      profileId,
      updateProfileDto,
      file,
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
