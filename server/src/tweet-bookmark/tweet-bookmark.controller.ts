import { Controller, Post, Delete, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Users } from 'src/auth/entities/users.entity';
import { GetAuthenticatedUser } from 'src/auth/get-authenticated-user.decorator';
import { TweetBookmarkService } from './tweet-bookmark.service';

@Controller('tweet-bookmarks')
@UseGuards(AuthGuard())
export class TweetBookmarkController {
  constructor(private tweetBookmarkService: TweetBookmarkService) {}

  // BOOKMARK TWEET
  @Post('/:tweetId/bookmark')
  async bookmarkTweet(
    @GetAuthenticatedUser() user: Users,
    @Param('tweetId') tweetId: number,
  ): Promise<void> {
    await this.tweetBookmarkService.bookmarkTweet(user, tweetId);
  }

  // UNBOOKMARK TWEET
  @Delete('/:tweetId/undo-bookmark')
  async unbookmarkTweet(
    @GetAuthenticatedUser() user: Users,
    @Param('tweetId') tweetId: number,
  ): Promise<void> {
    await this.tweetBookmarkService.unbookmarkTweet(user, tweetId);
  }
}
