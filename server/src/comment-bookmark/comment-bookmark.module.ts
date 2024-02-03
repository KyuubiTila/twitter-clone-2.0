import { Module } from '@nestjs/common';
import { CommentBookmarkService } from './comment-bookmark.service';
import { CommentBookmarkController } from './comment-bookmark.controller';

@Module({
  controllers: [CommentBookmarkController],
  providers: [CommentBookmarkService],
})
export class CommentBookmarkModule {}
