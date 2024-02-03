import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/auth/entities/users.entity';
import { Tweet } from 'src/tweet/entities/tweet.entity';
import { TweetBookmark } from './entities/tweet-bookmark.entity';

@Injectable()
export class TweetBookmarkService {
  constructor(
    @InjectRepository(TweetBookmark)
    private tweetBookmarkRepository: Repository<TweetBookmark>,
    @InjectRepository(Tweet)
    private tweetRepository: Repository<Tweet>,
  ) {}

  // BOOKMARK TWEET
  async bookmarkTweet(user: Users, tweetId: number): Promise<void> {
    const tweetToBookmark = await this.tweetRepository.findOne({
      where: { id: tweetId },
    });

    if (!tweetToBookmark) {
      throw new NotFoundException('Tweet not found');
    }

    const isBookmarked = await this.tweetBookmarkRepository.findOne({
      where: {
        userId: user.id,
        tweetId,
      },
    });

    if (isBookmarked) {
      throw new ConflictException('Tweet has already been bookmarked by you');
    } else {
      const newTweetBookmark = this.tweetBookmarkRepository.create({
        user,
        tweetId,
      });
      await this.tweetBookmarkRepository.save(newTweetBookmark);
    }

    await this.updateTweetFavoritedCount(tweetId);
    await tweetToBookmark.reload();
  }

  // UNBOOKMARK TWEET
  async unbookmarkTweet(user: Users, tweetId: number): Promise<void> {
    const tweetToUnbookmark = await this.tweetRepository.findOne({
      where: { id: tweetId },
    });

    if (!tweetToUnbookmark) {
      throw new NotFoundException('Tweet not found');
    }

    const tweetBookmark = await this.tweetBookmarkRepository.findOne({
      where: {
        userId: user.id,
        tweetId,
      },
    });

    if (!tweetBookmark) {
      throw new NotFoundException('Tweet has not been bookmarked by you');
    } else {
      await this.tweetBookmarkRepository.remove(tweetBookmark);
    }

    await this.updateTweetFavoritedCount(tweetId);
    await tweetToUnbookmark.reload();
  }

  // UPDATE TWEET BOOKMARK COUNT
  async updateTweetFavoritedCount(tweetId: number): Promise<void> {
    const count = await this.tweetBookmarkRepository.count({
      where: { tweetId },
    });
    await this.tweetRepository.update(
      { id: tweetId },
      { bookmarksCount: count },
    );
  }
}
