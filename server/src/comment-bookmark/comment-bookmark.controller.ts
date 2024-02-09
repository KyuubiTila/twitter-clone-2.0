import { Controller, Post, Delete, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetAuthenticatedUser } from 'src/auth/get-authenticated-user.decorator';
import { CommentBookmarkService } from './comment-bookmark.service';

@Controller('comment-bookmarks')
@UseGuards(AuthGuard())
export class CommentBookmarkController {
  constructor(private commentBookmarkService: CommentBookmarkService) {}

  // BOOKMARK COMMENT
  @Post('/:commentId')
  async bookmarkComment(
    @GetAuthenticatedUser() user: User,
    @Param('commentId') commentId: number,
  ): Promise<void> {
    await this.commentBookmarkService.bookmarkComment(user, commentId);
  }

  // UNBOOKMARK COMMENT
  @Delete('/:commentId')
  async unbookmarkComment(
    @GetAuthenticatedUser() user: User,
    @Param('commentId') commentId: number,
  ): Promise<void> {
    await this.commentBookmarkService.unbookmarkComment(user, commentId);
  }
}
