import { Module } from '@nestjs/common';
import { TweetBookmarkService } from './tweet-bookmark.service';
import { TweetBookmarkController } from './tweet-bookmark.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetBookmark } from './tweet-bookmark.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TweetModule } from 'src/tweet/tweet.module';

@Module({
  imports: [TypeOrmModule.forFeature([TweetBookmark]), AuthModule, TweetModule],
  controllers: [TweetBookmarkController],
  providers: [TweetBookmarkService],
})
export class TweetBookmarkModule {}
