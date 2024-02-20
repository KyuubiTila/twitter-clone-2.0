import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from 'src/auth/user.entity';
// import { CreateProfileDto } from './dto/create-profile.dto';
import { Follow } from 'src/follow/follow.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  //CREATE PROFILE
  // async createProfile(
  //   user: User,
  //   createProfileDto: CreateProfileDto,
  //   file: Express.Multer.File,
  // ): Promise<boolean> {
  //   try {
  //     const profileAlreadyExist = await this.profileRepository.findOne({
  //       where: { userId: user.id },
  //       select: ['userId'],
  //     });
  //     if (profileAlreadyExist) {
  //       throw new NotFoundException(
  //         'Profile already exists, you cannot create another one',
  //       );
  //     }
  //     const profile = new Profile();
  //     profile.bio = createProfileDto.bio;
  //     profile.image = file.filename;
  //     profile.userId = user.id;

  //     await this.profileRepository.insert(profile);
  //     return true;
  //   } catch (error) {
  //     throw new InternalServerErrorException(
  //       'Failed to create profile',
  //       error.message,
  //     );
  //   }
  // }

  // GET PROFILE BY ID
  async getProfileById(profileId: number): Promise<Profile> {
    try {
      const profile = await this.profileRepository
        .createQueryBuilder('profile')
        .leftJoinAndSelect('profile.user', 'user')
        .leftJoinAndSelect('user.following', 'following')
        .leftJoinAndSelect('user.follower', 'follower')
        .select([
          'profile.id',
          'profile.bio',
          'profile.image',
          'profile.userId',
          'profile.followingCount',
          'profile.followersCount',
          'user.id',
          'user.username',
          'follower.followerId',
          'following.followingId',
        ])
        .where('profile.userId = :profileId', { profileId })
        .getOne();

      if (!profile) {
        throw new NotFoundException('Profile not found');
      }

      return profile;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve profile',
        error.message,
      );
    }
  }

  // UPDATE PROFILE BY ID
  async updateProfile(
    user: User,
    profileId: number,
    updateProfileDto: UpdateProfileDto,
    file: Express.Multer.File,
  ): Promise<boolean> {
    try {
      const foundProfile = await this.getProfileById(profileId);

      if (foundProfile.userId !== user.id) {
        throw new UnauthorizedException(
          `You cannot update this user's profile, it is not yours`,
        );
      }

      if (foundProfile) {
        await this.profileRepository.update(
          { userId: profileId },
          {
            bio: updateProfileDto.bio,
            image: file.filename,
          },
        );
        await User.update(
          { id: user.id },
          { username: updateProfileDto.username },
        );
        return true;
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update profile',
        error.message,
      );
    }
  }

  // DELETE PROFILE BY ID
  async deleteProfile(user: User, profileId: number): Promise<boolean> {
    try {
      const foundProfile = await this.getProfileById(profileId);

      if (foundProfile.userId !== user.id) {
        throw new UnauthorizedException(
          `You cannot delete this user's profile, it is not yours`,
        );
      }

      if (foundProfile) {
        await this.profileRepository.delete({ userId: profileId });
        return true;
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to delete profile',
        error.message,
      );
    }
  }

  // UPDATE FOLLOWERS COUNT
  async updatefollowersCount(profileId: number): Promise<void> {
    try {
      const count = await Follow.count({
        where: { followingId: profileId },
      });

      await this.profileRepository.update(
        { userId: profileId },
        { followersCount: count },
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update followers count',
        error.message,
      );
    }
  }

  // UPDATE FOLLOWING COUNT
  async updatefollowingCount(user: User): Promise<void> {
    try {
      const count = await Follow.count({
        where: { followerId: user.id },
      });

      await this.profileRepository.update(
        { userId: user.id },
        { followingCount: count },
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update following count',
        error.message,
      );
    }
  }
}
