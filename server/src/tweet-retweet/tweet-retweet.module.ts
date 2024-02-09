import { AuthModule } from 'src/auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetRetweetController } from './tweet-retweet.controller';
import { TweetRetweet } from './tweet-retweet.entity';
import { TweetRetweetService } from './tweet-retweet.service';
import { TweetModule } from 'src/tweet/tweet.module';

@Module({
  imports: [TypeOrmModule.forFeature([TweetRetweet]), AuthModule, TweetModule],
  controllers: [TweetRetweetController],
  providers: [TweetRetweetService],
})
export class TweetRetweetModule {}
