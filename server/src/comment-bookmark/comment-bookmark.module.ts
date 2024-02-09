import { Module } from '@nestjs/common';
import { CommentBookmarkService } from './comment-bookmark.service';
import { CommentBookmarkController } from './comment-bookmark.controller';
import { CommentBookmark } from './comment-bookmark.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentModule } from 'src/comment/comment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentBookmark]),
    AuthModule,
    CommentModule,
  ],
  controllers: [CommentBookmarkController],
  providers: [CommentBookmarkService],
})
export class CommentBookmarkModule {}
