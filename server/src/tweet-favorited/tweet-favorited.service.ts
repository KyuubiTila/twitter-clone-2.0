import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/auth/users.entity';
import { Tweet } from 'src/tweet/tweet.entity';
import { TweetFavorited } from './tweet-favorited.entity';

@Injectable()
export class TweetFavoritedService {
  constructor(
    @InjectRepository(Tweet)
    private tweetRepository: Repository<Tweet>,
    @InjectRepository(TweetFavorited)
    private tweetFavoritedRepository: Repository<TweetFavorited>,
  ) {}

  // LIKE TWEET
  async likeTweet(user: Users, tweetId: number): Promise<void> {
    const tweetToLike = await this.tweetRepository.findOne({
      where: { id: tweetId },
    });

    if (!tweetToLike) {
      throw new NotFoundException('tweet not found');
    }

    const isLiked = await this.tweetFavoritedRepository.findOne({
      where: {
        userId: user.id,
        tweetId: tweetId,
      },
    });

    if (isLiked) {
      throw new ConflictException('Tweet has already been liked before by you');
    } else {
      const newTweetLike = this.tweetFavoritedRepository.create({
        user,
        tweetId,
      });
      await this.tweetFavoritedRepository.save(newTweetLike);
    }

    await this.updateTweetFavoritedCount(tweetId);
    await tweetToLike.reload();
  }

  // UNLIKE TWEET
  async unlikeTweet(user: Users, tweetId: number): Promise<void> {
    const tweetToUnlike = await this.tweetRepository.findOne({
      where: { id: tweetId },
    });

    if (!tweetToUnlike) {
      throw new NotFoundException('Tweet not found');
    }

    const isLiked = await this.tweetFavoritedRepository.findOne({
      where: {
        userId: user.id,
        tweetId: tweetId,
      },
    });

    if (!isLiked) {
      throw new NotFoundException('Tweet has not been liked by you');
    } else {
      await this.tweetFavoritedRepository.remove(isLiked);
    }

    await this.updateTweetFavoritedCount(tweetId);
    await tweetToUnlike.reload();
  }

  // UPDATE TWEET FAVORITED COUNT
  async updateTweetFavoritedCount(
    tweetId: number,
  ): Promise<{ success: boolean; message: string }> {
    const count = await this.tweetFavoritedRepository.count({
      where: { tweetId },
    });
    await this.tweetRepository.update({ id: tweetId }, { likesCount: count });

    return {
      success: true,
      message: 'Tweet likes count updated successfully',
    };
  }
}
