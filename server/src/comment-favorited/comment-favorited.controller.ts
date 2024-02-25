import {
  Controller,
  Post,
  Delete,
  Param,
  UseGuards,
  Get,
} from '@nestjs/common';
import { CommentFavoritedService } from './comment-favorited.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetAuthenticatedUser } from 'src/auth/get-authenticated-user.decorator';

@Controller('comment-favorited')
@UseGuards(AuthGuard())
export class CommentFavoritedController {
  constructor(private commentFavoritedService: CommentFavoritedService) {}

  @Post(':commentId')
  async likeComment(
    @GetAuthenticatedUser() user: User,
    @Param('commentId') commentId: number,
  ): Promise<void> {
    await this.commentFavoritedService.likeComment(user, commentId);
  }

  @Delete(':commentId')
  async unlikeComment(
    @GetAuthenticatedUser() user: User,
    @Param('commentId') commentId: number,
  ): Promise<void> {
    await this.commentFavoritedService.unlikeComment(user, commentId);
  }

  // GET FAVORITED COMMENTS BY USER
  @Get('user/:userId')
  async getFavoritedCommentsByUser(@Param('userId') userId: number) {
    return await this.commentFavoritedService.getFavoritedCommentsByUser(
      userId,
    );
  }
}
