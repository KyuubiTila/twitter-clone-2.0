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
import { Users } from 'src/auth/users.entity';
import { Tweet } from './tweet.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetAuthenticatedUser } from 'src/auth/get-authenticated-user.decorator';

@Controller('tweets')
@UseGuards(AuthGuard())
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Post()
  async createTweet(
    @GetAuthenticatedUser() user: Users,
    @Body() createTweetDto: CreateTweetDto,
  ): Promise<Tweet> {
    return this.tweetService.createTweet(user, createTweetDto);
  }

  @Patch(':id')
  async updateTweet(
    @GetAuthenticatedUser() user: Users,
    @Param('id') id: number,
    @Body() updateTweetDto: UpdateTweetDto,
  ): Promise<Tweet> {
    return this.tweetService.updateTweet(user, id, updateTweetDto);
  }

  @Get()
  getAllTweets() {
    return this.tweetService.getAllTweets();
  }

  @Get(':id')
  getTweetById(@Param('id') id: number) {
    return this.tweetService.getTweetById(id);
  }

  @Delete(':id')
  async deleteTweetById(
    @GetAuthenticatedUser() user: Users,
    @Param('id') id: number,
  ) {
    return this.tweetService.deleteTweetById(user, id);
  }
}
