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

  async getProfileById(id: number): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: { userId: id },
      relations: ['user', 'user.following', 'user.followers'],
    });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }

  async updateProfile(
    user: Users,
    id: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    if (user.id !== id) {
      throw new UnauthorizedException(
        `You cannot update this user's profile, it is not yours`,
      );
    }

    const foundProfile = await this.getProfileById(id);

    if (foundProfile) {
      foundProfile.bio = updateProfileDto.bio;
      foundProfile.image = updateProfileDto.image;
      return await this.profileRepository.save(foundProfile);
    }
  }
}
