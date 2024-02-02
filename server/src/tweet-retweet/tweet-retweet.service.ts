import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/auth/users.entity';
import { Tweet } from 'src/tweet/tweet.entity';
import { TweetRetweet } from './tweet-retweet.entity';

@Injectable()
export class TweetRetweetService {
  constructor(
    @InjectRepository(Tweet)
    private tweetRepository: Repository<Tweet>,
    @InjectRepository(TweetRetweet)
    private tweetRetweetRepository: Repository<TweetRetweet>,
  ) {}

  // RETWEET TWEET
  async retweetTweet(user: Users, tweetId: number): Promise<void> {
    const tweetToRetweet = await this.tweetRepository.findOne({
      where: { id: tweetId },
    });

    if (!tweetToRetweet) {
      throw new NotFoundException('Tweet not found');
    }

    const hasRetweeted = await this.tweetRetweetRepository.findOne({
      where: {
        userId: user.id,
        tweetId: tweetId,
      },
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
      await this.tweetRetweetRepository.save(newTweetRetweet);
    }

    await tweetToRetweet.reload();
  }

  // UNDO RETWEET TWEET
  async undoRetweetTweet(user: Users, tweetId: number): Promise<void> {
    const tweetToUndoRetweet = await this.tweetRepository.findOne({
      where: { id: tweetId },
    });

    if (!tweetToUndoRetweet) {
      throw new NotFoundException('Tweet not found');
    }

    const retweet = await this.tweetRetweetRepository.findOne({
      where: {
        userId: user.id,
        tweetId: tweetId,
      },
    });

    if (!retweet) {
      throw new NotFoundException('Tweet has not been retweeted by you');
    } else {
      await this.tweetRetweetRepository.remove(retweet);
    }

    await tweetToUndoRetweet.reload();
  }
}
