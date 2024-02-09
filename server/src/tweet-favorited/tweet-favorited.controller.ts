import { Controller, Post, Delete, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetAuthenticatedUser } from 'src/auth/get-authenticated-user.decorator';
import { User } from 'src/auth/user.entity';
import { TweetFavoritedService } from './tweet-favorited.service';

@Controller('tweet-favoriting')
export class TweetFavoritedController {
  constructor(private readonly tweetFavoritedService: TweetFavoritedService) {}

  @Post(':tweetId')
  @UseGuards(AuthGuard())
  async likeTweet(
    @GetAuthenticatedUser() user: User,
    @Param('tweetId') tweetId: number,
  ): Promise<void> {
    await this.tweetFavoritedService.likeTweet(user, tweetId);
  }

  @Delete(':tweetId')
  @UseGuards(AuthGuard())
  async unlikeTweet(
    @GetAuthenticatedUser() user: User,
    @Param('tweetId') tweetId: number,
  ): Promise<void> {
    await this.tweetFavoritedService.unlikeTweet(user, tweetId);
  }
}
