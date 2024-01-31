import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetRetweetController } from './tweet-retweet.controller';
import { TweetRetweet } from './tweet-retweet.entity';
import { TweetRetweetService } from './tweet-retweet.service';

@Module({
  imports: [TypeOrmModule.forFeature([TweetRetweet])],
  controllers: [TweetRetweetController],
  providers: [TweetRetweetService],
})
export class TweetRetweetModule {}
