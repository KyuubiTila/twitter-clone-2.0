import { CreateTweetDto } from './dto/create-tweet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { User } from 'src/auth/user.entity';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { TweetBookmark } from 'src/tweet-bookmark/tweet-bookmark.entity';
import { TweetFavorited } from 'src/tweet-favorited/tweet-favorited.entity';
import { TweetRetweet } from 'src/tweet-retweet/tweet-retweet.entity';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(Tweet)
    private tweetRepository: Repository<Tweet>,
  ) {}

  // CREATE TWEET
  async createTweet(
    user: User,
    createTweetDto: CreateTweetDto,
  ): Promise<boolean> {
    try {
      const tweet = new Tweet();
      tweet.content = createTweetDto.content;
      tweet.user = user;

      await this.tweetRepository.insert(tweet);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create tweet',
        error.message,
      );
    }
  }

  // GET TWEET BY ID
  async getTweetById(tweetId: number): Promise<Tweet> {
    try {
      const tweet = await this.tweetRepository.findOne({
        where: { id: tweetId },
        relations: [
          'user',
          'user.profile',
          'comment',
          'tweet_favorited',
          'tweet_retweeted',
          'tweet_bookmarked',
          'user.follower',
        ],
      });

      if (!tweet) {
        throw new NotFoundException('Tweet not found');
      }
      InternalServerErrorException;

      return tweet;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve tweet',
        error.message,
      );
    }
  }

  // GET ALL TWEETS CREATED BY USER
  async getAllTweetsCreatedByUser(userId: number): Promise<Tweet[]> {
    try {
      return await this.tweetRepository.find({
        where: { userId },
        relations: [
          'user',
          'tweet_favorited',
          'tweet_retweeted',
          'tweet_bookmarked',
        ],
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve all tweets created by user ${userId}`,
        error.message,
      );
    }
  }

  // VERIFY TWEET BY RETURNING USERID
  async returnTweetUserId(tweetId: number): Promise<Tweet> {
    try {
      const tweet = await this.tweetRepository.findOne({
        where: { id: tweetId },
        select: ['userId', 'id'],
      });

      if (!tweet) {
        throw new NotFoundException('Tweet not found');
      }

      return tweet;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to return tweet user ID',
        error.message,
      );
    }
  }

  // CHECK IF TWEET EXIST BY ID
  async tweetExists(tweetId: number): Promise<boolean> {
    try {
      const tweet = await this.tweetRepository.findOne({
        where: { id: tweetId },
        select: ['id'],
      });

      return !!tweet;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to check if tweet exists',
        error.message,
      );
    }
  }

  // UPDATE TWEET BOOKMARK COUNT
  async updateTweetBookmarkCount(tweetId: number): Promise<void> {
    try {
      const count = await TweetBookmark.count({
        where: { tweetId },
      });
      await this.tweetRepository.update(
        { id: tweetId },
        { bookmarksCount: count },
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update tweet bookmark count',
        error.message,
      );
    }
  }

  // UPDATE TWEET FAVORITED COUNT
  async updateTweetFavoritedCount(tweetId: number): Promise<void> {
    try {
      const count = await TweetFavorited.count({
        where: { tweetId },
      });
      await this.tweetRepository.update({ id: tweetId }, { likesCount: count });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update tweet favorited count',
        error.message,
      );
    }
  }

  // UPDATE TWEET RETWEET COUNT
  async updateTweetRetweetCount(tweetId: number): Promise<void> {
    try {
      const count = await TweetRetweet.count({
        where: { tweetId },
      });
      await this.tweetRepository.update(
        { id: tweetId },
        { retweetsCount: count },
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update tweet retweet count',
        error.message,
      );
    }
  }

  // UPDATE TWEET
  async updateTweet(
    user: User,
    tweetId: number,
    updateTweetDto: UpdateTweetDto,
  ): Promise<boolean> {
    try {
      const tweetToUpdate = await this.returnTweetUserId(tweetId);

      if (tweetToUpdate.userId !== user.id) {
        throw new NotFoundException(
          'You cannot update this tweet, you did not create it',
        );
      }
      await this.tweetRepository.update(
        { id: tweetId },
        {
          content: updateTweetDto.content,
        },
      );
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update tweet',
        error.message,
      );
    }
  }

  // DELETE TWEET BY ID
  async deleteTweetById(user: User, tweetId: number): Promise<boolean> {
    try {
      const tweetToBeDeleted = await this.returnTweetUserId(tweetId);

      if (tweetToBeDeleted.userId !== user.id) {
        throw new NotFoundException(
          'You cannot delete tweet you did not create',
        );
      }
      await this.tweetRepository.remove(tweetToBeDeleted);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to delete tweet',
        error.message,
      );
    }
  }

  // GET ALL TWEETS
  async getAllTweets(): Promise<Tweet[]> {
    try {
      return await this.tweetRepository.find({
        relations: [
          'user',
          'comment',
          'tweet_favorited',
          'tweet_retweeted',
          'tweet_bookmarked',
          'user.profile',
          'user.follower',
        ],
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve all tweets',
        error.message,
      );
    }
  }
}
