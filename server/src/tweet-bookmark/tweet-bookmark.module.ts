import { Module } from '@nestjs/common';
import { TweetBookmarkService } from './tweet-bookmark.service';
import { TweetBookmarkController } from './tweet-bookmark.controller';

@Module({
  controllers: [TweetBookmarkController],
  providers: [TweetBookmarkService],
})
export class TweetBookmarkModule {}
