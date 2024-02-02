import { Controller, Post, Delete, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetAuthenticatedUser } from 'src/auth/get-authenticated-user.decorator';
import { Users } from 'src/auth/users.entity';
import { TweetFavoritedService } from './tweet-favorited.service';

@Controller('tweet-favoriting')
export class TweetFavoritedController {
  constructor(private readonly tweetFavoritedService: TweetFavoritedService) {}

  @Post(':tweetId/like')
  @UseGuards(AuthGuard())
  async likeTweet(
    @GetAuthenticatedUser() user: Users,
    @Param('tweetId') tweetId: number,
  ): Promise<void> {
    await this.tweetFavoritedService.likeTweet(user, tweetId);
  }

  @Delete(':tweetId/undo-like')
  @UseGuards(AuthGuard())
  async unlikeTweet(
    @GetAuthenticatedUser() user: Users,
    @Param('tweetId') tweetId: number,
  ): Promise<void> {
    await this.tweetFavoritedService.unlikeTweet(user, tweetId);
  }
}
