import { Controller, Post, Delete, Param, UseGuards } from '@nestjs/common';
import { CommentFavoritedService } from './comment-favorited.service';
import { AuthGuard } from '@nestjs/passport';
import { Users } from 'src/auth/entities/users.entity';
import { GetAuthenticatedUser } from 'src/auth/get-authenticated-user.decorator';

@Controller('comment-favorited')
@UseGuards(AuthGuard())
export class CommentFavoritedController {
  constructor(private commentFavoritedService: CommentFavoritedService) {}

  @Post(':commentId/like')
  async likeComment(
    @GetAuthenticatedUser() user: Users,
    @Param('commentId') commentId: number,
  ): Promise<void> {
    await this.commentFavoritedService.likeComment(user, commentId);
  }

  @Delete(':commentId/undo-like')
  async unlikeComment(
    @GetAuthenticatedUser() user: Users,
    @Param('commentId') commentId: number,
  ): Promise<void> {
    await this.commentFavoritedService.unlikeComment(user, commentId);
  }
}
