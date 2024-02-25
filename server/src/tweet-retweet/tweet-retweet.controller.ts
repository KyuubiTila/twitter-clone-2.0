import {
  Controller,
  Post,
  Delete,
  Param,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetAuthenticatedUser } from 'src/auth/get-authenticated-user.decorator';
import { User } from 'src/auth/user.entity';
import { TweetRetweetService } from './tweet-retweet.service';

@Controller('tweets-retweets')
@UseGuards(AuthGuard())
export class TweetRetweetController {
  constructor(private tweetRetweetService: TweetRetweetService) {}

  @Post(':tweetId')
  async retweetTweet(
    @GetAuthenticatedUser() user: User,
    @Param('tweetId') tweetId: number,
  ): Promise<void> {
    await this.tweetRetweetService.retweetTweet(user, tweetId);
  }

  @Delete(':tweetId')
  async undoRetweetTweet(
    @GetAuthenticatedUser() user: User,
    @Param('tweetId') tweetId: number,
  ): Promise<void> {
    await this.tweetRetweetService.undoRetweetTweet(user, tweetId);
  }

  // GET RETWEETED TWEETS BY USER
  @Get('user/:userId')
  async getRetweetedTweetsByUser(@Param('userId') userId: number) {
    return await this.tweetRetweetService.getRetweetedTweetsByUser(userId);
  }
}
