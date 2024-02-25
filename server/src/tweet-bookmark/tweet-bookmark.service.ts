import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { TweetBookmark } from './tweet-bookmark.entity';
import { TweetService } from 'src/tweet/tweet.service';

@Injectable()
export class TweetBookmarkService {
  constructor(
    @InjectRepository(TweetBookmark)
    private tweetBookmarkRepository: Repository<TweetBookmark>,
    private tweetService: TweetService,
  ) {}

  // InternalServerErrorExceptionBOOKMARK TWEET
  async bookmarkTweet(user: User, tweetId: number): Promise<void> {
    try {
      const tweetToBookmark = await this.tweetService.tweetExists(tweetId);

      if (!tweetToBookmark) {
        throw new NotFoundException('Tweet not found');
      }

      const isBookmarked = await this.tweetBookmarkRepository.findOne({
        where: {
          userId: user.id,
          tweetId,
        },
        select: ['id'],
      });

      if (isBookmarked) {
        throw new ConflictException('Tweet has already been bookmarked by you');
      } else {
        const newTweetBookmark = this.tweetBookmarkRepository.create({
          user,
          tweetId,
        });
        await this.tweetBookmarkRepository.insert(newTweetBookmark);
      }

      await this.tweetService.updateTweetBookmarkCount(tweetId);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to bookmark tweet',
        error.message,
      );
    }
  }

  // UNBOOKMARK TWEET
  async unbookmarkTweet(user: User, tweetId: number): Promise<void> {
    try {
      const tweetToUnbookmark = await this.tweetService.tweetExists(tweetId);

      if (!tweetToUnbookmark) {
        throw new NotFoundException('Tweet not found');
      }

      const tweetBookmark = await this.tweetBookmarkRepository.findOne({
        where: {
          userId: user.id,
          tweetId,
        },
        select: ['id'],
      });

      if (!tweetBookmark) {
        throw new NotFoundException('Tweet has not been bookmarked by you');
      } else {
        await this.tweetBookmarkRepository.remove(tweetBookmark);
      }

      await this.tweetService.updateTweetBookmarkCount(tweetId);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to unbookmark tweet',
        error.message,
      );
    }
  }

  // GET BOKKMARKED TWEET BY USER
  async getBookmarkedTweetsByUser(userId: number): Promise<TweetBookmark[]> {
    try {
      const commentBookmarks = await this.tweetBookmarkRepository.find({
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
        'Failed to fetch bookmarked tweets',
        error.message,
      );
    }
  }
}
