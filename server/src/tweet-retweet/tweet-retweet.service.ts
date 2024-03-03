import { TweetService } from 'src/tweet/tweet.service';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { TweetRetweet } from './tweet-retweet.entity';

@Injectable()
export class TweetRetweetService {
  constructor(
    @InjectRepository(TweetRetweet)
    private tweetRetweetRepository: Repository<TweetRetweet>,
    private tweetService: TweetService,
  ) {}

  // RETWEET TWEET
  async retweetTweet(user: User, tweetId: number): Promise<void> {
    try {
      const tweetToRetweet = await this.tweetService.tweetExists(tweetId);

      if (!tweetToRetweet) {
        throw new NotFoundException('Tweet not found');
      }

      const hasRetweeted = await this.tweetRetweetRepository.findOne({
        where: {
          userId: user.id,
          tweetId: tweetId,
        },
        select: ['id'],
      });

      if (hasRetweeted) {
        throw new ConflictException(
          'Tweet has already been retweeted by you already',
        );
      } else {
        const newTweetRetweet = this.tweetRetweetRepository.create({
          user,
          tweetId,
        });
        await this.tweetRetweetRepository.insert(newTweetRetweet);
      }

      await this.tweetService.updateTweetRetweetCount(tweetId);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retweet tweet',
        error.message,
      );
    }
  }

  // UNDO RETWEET TWEET
  async undoRetweetTweet(user: User, tweetId: number): Promise<void> {
    try {
      const tweetToUndoRetweet = await this.tweetService.tweetExists(tweetId);

      if (!tweetToUndoRetweet) {
        throw new NotFoundException('Tweet not found');
      }

      const retweet = await this.tweetRetweetRepository.findOne({
        where: {
          userId: user.id,
          tweetId: tweetId,
        },
        select: ['id'],
      });

      if (!retweet) {
        throw new NotFoundException('Tweet has not been retweeted by you');
      } else {
        await this.tweetRetweetRepository.remove(retweet);
      }

      await this.tweetService.updateTweetRetweetCount(tweetId);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to undo retweet tweet',
        error.message,
      );
    }
  }

  // GET RETWEETED TWEETS BY USER
  async getRetweetedTweetsByUser(userId: number): Promise<TweetRetweet[]> {
    try {
      const tweetRetweets = await this.tweetRetweetRepository.find({
        where: { userId },
        relations: [
          'tweet',
          'tweet.user',
          'tweet.tweet_favorited',
          'tweet.tweet_retweeted',
          'tweet.tweet_bookmarked',
        ],
      });
      return tweetRetweets;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch retweeted tweets',
        error.message,
      );
    }
  }
}
