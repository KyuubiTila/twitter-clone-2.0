import { Controller, Param, Post, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentRetweetService } from './comment-retweet.service';
import { Users } from 'src/auth/users.entity';
import { GetAuthenticatedUser } from 'src/auth/get-authenticated-user.decorator';

@Controller('comment-retweet')
export class CommentRetweetController {
  constructor(private commentRetweetService: CommentRetweetService) {}

  // RETWEET COMMENT
  @Post(':commentId/retweet')
  @UseGuards(AuthGuard())
  async retweetComment(
    @GetAuthenticatedUser() user: Users,
    @Param('commentId') commentId: number,
  ): Promise<void> {
    await this.commentRetweetService.retweetComment(user, commentId);
  }

  // UNDO RETWEET COMMENT
  @Delete(':commentId/undo-retweet')
  @UseGuards(AuthGuard())
  async undoRetweetComment(
    @GetAuthenticatedUser() user: Users,
    @Param('commentId') commentId: number,
  ): Promise<void> {
    await this.commentRetweetService.undoRetweetComment(user, commentId);
  }
}
