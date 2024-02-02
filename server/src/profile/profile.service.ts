import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Users } from 'src/auth/users.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  // GET PROFILE BY ID
  async getProfileById(profileId: number): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: { userId: profileId },
      relations: ['user', 'user.following', 'user.followers'],
    });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }

  // UPDATE PROFILE BY ID
  async updateProfile(
    user: Users,
    profileId: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const foundProfile = await this.getProfileById(profileId);

    if (foundProfile.userId !== user.id) {
      throw new UnauthorizedException(
        `You cannot update this user's profile, it is not yours`,
      );
    }

    if (foundProfile) {
      foundProfile.bio = updateProfileDto.bio;
      foundProfile.image = updateProfileDto.image;
      return await this.profileRepository.save(foundProfile);
    }
  }
}
