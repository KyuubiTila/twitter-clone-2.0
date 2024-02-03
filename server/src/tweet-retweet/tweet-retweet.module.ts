import { AuthModule } from 'src/auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from 'src/tweet/entities/tweet.entity';
import { TweetRetweetController } from './tweet-retweet.controller';
import { TweetRetweet } from './entities/tweet-retweet.entity';
import { TweetRetweetService } from './tweet-retweet.service';

@Module({
  imports: [TypeOrmModule.forFeature([TweetRetweet, Tweet]), AuthModule],
  controllers: [TweetRetweetController],
  providers: [TweetRetweetService],
})
export class TweetRetweetModule {}
