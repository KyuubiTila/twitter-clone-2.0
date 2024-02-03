import { Controller, Post, Delete, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetAuthenticatedUser } from 'src/auth/get-authenticated-user.decorator';
import { Users } from 'src/auth/entities/users.entity';
import { TweetRetweetService } from './tweet-retweet.service';

@Controller('tweets-retweets')
@UseGuards(AuthGuard())
export class TweetRetweetController {
  constructor(private tweetRetweetService: TweetRetweetService) {}

  @Post(':tweetId/retweet')
  async retweetTweet(
    @GetAuthenticatedUser() user: Users,
    @Param('tweetId') tweetId: number,
  ): Promise<void> {
    await this.tweetRetweetService.retweetTweet(user, tweetId);
  }

  @Delete(':tweetId/undo-retweet')
  async undoRetweetTweet(
    @GetAuthenticatedUser() user: Users,
    @Param('tweetId') tweetId: number,
  ): Promise<void> {
    await this.tweetRetweetService.undoRetweetTweet(user, tweetId);
  }
}
