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

  @Get('/:id')
  getProfileById(@Param('id') id: number) {
    return this.profileService.getProfileById(id);
  }

  @Patch('/:id')
  async updateProfile(
    @GetAuthenticatedUser() user: Users,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    return await this.profileService.updateProfile(user, id, updateProfileDto);
  }

  // @Get(':id/following-followers')
  // async getFollowingAndFollowers(@Param('id') id: string) {
  //   const { following, followers } =
  //     await this.profileService.getFollowingAndFollowers(Number(id));
  //   return {
  //     following,
  //     followers,
  //   };
  // }
}
