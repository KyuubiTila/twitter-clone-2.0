import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Users } from 'src/auth/users.entity';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { GetAuthenticatedUser } from 'src/auth/get-authenticated-user.decorator';

@Controller('comments')
@UseGuards(AuthGuard('jwt'))
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':tweetId')
  async createComment(
    @GetAuthenticatedUser() user: Users,
    @Param('tweetId') tweetId: number,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    return await this.commentService.createComment(
      user,
      tweetId,
      createCommentDto,
    );
  }

  @Get(':commentId')
  async getCommentById(
    @Param('commentId') commentId: number,
  ): Promise<Comment> {
    return await this.commentService.getCommentById(commentId);
  }

  @Patch(':commentId')
  async updateComment(
    @GetAuthenticatedUser() user: Users,
    @Param('commentId') commentId: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    return await this.commentService.updateComment(
      user,
      commentId,
      updateCommentDto,
    );
  }

  @Delete(':commentId')
  async deleteComment(
    @GetAuthenticatedUser() user: Users,
    @Param('commentId') commentId: number,
  ): Promise<void> {
    return await this.commentService.deleteComment(user, commentId);
  }

  @Get('tweet/:tweetId')
  async getCommentsForTweet(
    @Param('tweetId') tweetId: number,
  ): Promise<Comment[]> {
    return await this.commentService.getCommentsForTweet(tweetId);
  }
}
