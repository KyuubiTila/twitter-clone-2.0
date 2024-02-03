import { Controller, Post, Delete, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Users } from 'src/auth/entities/users.entity';
import { GetAuthenticatedUser } from 'src/auth/get-authenticated-user.decorator';
import { CommentBookmarkService } from './comment-bookmark.service';

@Controller('comment-bookmarks')
@UseGuards(AuthGuard())
export class CommentBookmarkController {
  constructor(private commentBookmarkService: CommentBookmarkService) {}

  // BOOKMARK COMMENT
  @Post('/:commentId/bookmark')
  async bookmarkComment(
    @GetAuthenticatedUser() user: Users,
    @Param('commentId') commentId: number,
  ): Promise<void> {
    await this.commentBookmarkService.bookmarkComment(user, commentId);
  }

  // UNBOOKMARK COMMENT
  @Delete('/:commentId/undo-bookmark')
  async unbookmarkComment(
    @GetAuthenticatedUser() user: Users,
    @Param('commentId') commentId: number,
  ): Promise<void> {
    await this.commentBookmarkService.unbookmarkComment(user, commentId);
  }
}
