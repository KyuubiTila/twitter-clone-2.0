import { Controller, Post, Delete, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetAuthenticatedUser } from 'src/auth/get-authenticated-user.decorator';
import { TweetBookmarkService } from './tweet-bookmark.service';

@Controller('tweet-bookmarks')
@UseGuards(AuthGuard())
export class TweetBookmarkController {
  constructor(private tweetBookmarkService: TweetBookmarkService) {}

  // BOOKMARK TWEET
  @Post(':tweetId')
  async bookmarkTweet(
    @GetAuthenticatedUser() user: User,
    @Param('tweetId') tweetId: number,
  ): Promise<void> {
    await this.tweetBookmarkService.bookmarkTweet(user, tweetId);
  }

  // UNBOOKMARK TWEET
  @Delete(':tweetId')
  async unbookmarkTweet(
    @GetAuthenticatedUser() user: User,
    @Param('tweetId') tweetId: number,
  ): Promise<void> {
    await this.tweetBookmarkService.unbookmarkTweet(user, tweetId);
  }
}
