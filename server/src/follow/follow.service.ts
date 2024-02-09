import { ProfileService } from './../profile/profile.service';
import {
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { Follow } from './follow.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow)
    private followRepository: Repository<Follow>,
    private profileService: ProfileService,
  ) {}

  //FOLLOW USER
  async follow(userId: number, user: User): Promise<void> {
    try {
      const userToBeFollowed = await User.findOne({
        where: { id: userId },
        relations: ['follower', 'following', 'profile'],
      });

      const authenticatedUserFollowing = await User.findOne({
        where: { id: user.id },
        relations: ['follower', 'following', 'profile'],
      });

      if (!userToBeFollowed || !authenticatedUserFollowing) {
        throw new NotFoundException(
          'User not found or follower not authenticated',
        );
      }

      if (userToBeFollowed.id === authenticatedUserFollowing.id) {
        throw new NotAcceptableException('You cannot follow yourself');
      }

      const getFollowerIdOfUserToBeFollowed = userToBeFollowed.follower.map(
        (follow) => {
          return follow.followerId;
        },
      );

      const isUserToBeFollowedAlreadyFollowed =
        getFollowerIdOfUserToBeFollowed.some(
          (follower) => follower === authenticatedUserFollowing.id,
        );

      if (isUserToBeFollowedAlreadyFollowed) {
        throw new NotAcceptableException('You already follow this user');
      }

      const newFollower = this.followRepository.create({
        followerId: authenticatedUserFollowing.id,
        followingId: userToBeFollowed.id,
      });
      await this.followRepository.insert(newFollower);
      await this.profileService.updatefollowersCount(userId);
      await this.profileService.updatefollowingCount(user);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to follow user: ' + error.message,
      );
    }
  }

  //UNFOLLOW USER
  async unfollow(userId: number, user: User): Promise<void> {
    try {
      const userToBeUnfollowed = await User.findOne({
        where: { id: userId },
        relations: ['follower'],
      });

      const authenticatedUserUnfollowing = await User.findOne({
        where: { id: user.id },
        relations: ['following'],
      });

      if (!userToBeUnfollowed || !authenticatedUserUnfollowing) {
        throw new NotFoundException(
          'User not found or unfollower not authenticated',
        );
      }

      if (userToBeUnfollowed.id === authenticatedUserUnfollowing.id) {
        throw new NotAcceptableException('You cannot unfollow yourself');
      }

      await this.followRepository.delete({
        followerId: authenticatedUserUnfollowing.id,
        followingId: userToBeUnfollowed.id,
      });

      await this.profileService.updatefollowersCount(userId);
      await this.profileService.updatefollowingCount(user);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to unfollow user: ' + error.message,
      );
    }
  }
}
