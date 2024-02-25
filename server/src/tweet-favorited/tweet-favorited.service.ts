import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { TweetFavorited } from './tweet-favorited.entity';
import { TweetService } from 'src/tweet/tweet.service';

@Injectable()
export class TweetFavoritedService {
  constructor(
    @InjectRepository(TweetFavorited)
    private tweetFavoritedRepository: Repository<TweetFavorited>,
    private tweetService: TweetService,
  ) {}

  // LIKE TWEET
  async likeTweet(user: User, tweetId: number): Promise<void> {
    try {
      const tweetToLike = await this.tweetService.tweetExists(tweetId);

      if (!tweetToLike) {
        throw new NotFoundException('Tweet not found');
      }

      const isLiked = await this.tweetFavoritedRepository.findOne({
        where: {
          userId: user.id,
          tweetId,
        },
        select: ['id'],
      });

      if (isLiked) {
        throw new ConflictException(
          'Tweet has already been liked before by you',
        );
      } else {
        const newTweetLike = this.tweetFavoritedRepository.create({
          user,
          tweetId,
        });
        await this.tweetFavoritedRepository.insert(newTweetLike);
      }

      await this.tweetService.updateTweetFavoritedCount(tweetId);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to like tweet',
        error.message,
      );
    }
  }

  // UNLIKE TWEET
  async unlikeTweet(user: User, tweetId: number): Promise<void> {
    try {
      const tweetToUnlike = await this.tweetService.tweetExists(tweetId);

      if (!tweetToUnlike) {
        throw new NotFoundException('Tweet not found');
      }

      const isLiked = await this.tweetFavoritedRepository.findOne({
        where: {
          userId: user.id,
          tweetId,
        },
        select: ['id'],
      });

      if (!isLiked) {
        throw new NotFoundException('Tweet has not been liked by you');
      } else {
        await this.tweetFavoritedRepository.remove(isLiked);
      }

      await this.tweetService.updateTweetFavoritedCount(tweetId);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to unlike tweet',
        error.message,
      );
    }
  }

  // GET FAVORITED TWEETS BY USER
  async getFavoritedTweetsByUser(userId: number): Promise<TweetFavorited[]> {
    try {
      const commentBookmarks = await this.tweetFavoritedRepository.find({
        where: { userId },
        relations: [
          'tweet',
          'tweet.user',
          'tweet.user.follower',
          'tweet.user.profile',
          'tweet.tweet_favorited',
          'tweet.tweet_retweeted',
          'tweet.tweet_bookmarked',
        ],
      });
      return commentBookmarks;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch favorited tweets',
        error.message,
      );
    }
  }
}
