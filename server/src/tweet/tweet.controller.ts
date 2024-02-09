import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Get,
  Delete,
} from '@nestjs/common';

import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetAuthenticatedUser } from 'src/auth/get-authenticated-user.decorator';

@Controller('tweets')
@UseGuards(AuthGuard())
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Post()
  async createTweet(
    @GetAuthenticatedUser() user: User,
    @Body() createTweetDto: CreateTweetDto,
  ): Promise<boolean> {
    return this.tweetService.createTweet(user, createTweetDto);
  }

  @Get(':tweetId')
  getTweetById(@Param('tweetId') tweetId: number) {
    return this.tweetService.getTweetById(tweetId);
  }

  @Patch(':tweetId')
  async updateTweet(
    @GetAuthenticatedUser() user: User,
    @Param('tweetId') tweetId: number,
    @Body() updateTweetDto: UpdateTweetDto,
  ): Promise<boolean> {
    return this.tweetService.updateTweet(user, tweetId, updateTweetDto);
  }

  @Delete(':tweetId')
  async deleteTweetById(
    @GetAuthenticatedUser() user: User,
    @Param('tweetId') tweetId: number,
  ): Promise<boolean> {
    return this.tweetService.deleteTweetById(user, tweetId);
  }

  @Get()
  getAllTweets() {
    return this.tweetService.getAllTweets();
  }
}
