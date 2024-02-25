import {
  Controller,
  Param,
  Post,
  Delete,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentRetweetService } from './comment-retweet.service';
import { User } from 'src/auth/user.entity';
import { GetAuthenticatedUser } from 'src/auth/get-authenticated-user.decorator';

@Controller('comment-retweet')
export class CommentRetweetController {
  constructor(private commentRetweetService: CommentRetweetService) {}

  // RETWEET COMMENT
  @Post(':commentId')
  @UseGuards(AuthGuard())
  async retweetComment(
    @GetAuthenticatedUser() user: User,
    @Param('commentId') commentId: number,
  ): Promise<void> {
    await this.commentRetweetService.retweetComment(user, commentId);
  }

  // UNDO RETWEET COMMENT
  @Delete(':commentId')
  @UseGuards(AuthGuard())
  async undoRetweetComment(
    @GetAuthenticatedUser() user: User,
    @Param('commentId') commentId: number,
  ): Promise<void> {
    await this.commentRetweetService.undoRetweetComment(user, commentId);
  }

  // GET RETWEETED COMMENTS BY USER
  @Get('user/:userId')
  async getRetweetedCommentsByUser(@Param('userId') userId: number) {
    return await this.commentRetweetService.getRetweetedCommentsByUser(userId);
  }
}
