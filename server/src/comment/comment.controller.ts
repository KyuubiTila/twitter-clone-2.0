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
import { User } from 'src/auth/user.entity';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { GetAuthenticatedUser } from 'src/auth/get-authenticated-user.decorator';

@Controller('comments')
@UseGuards(AuthGuard())
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':tweetId')
  async createComment(
    @GetAuthenticatedUser() user: User,
    @Param('tweetId') tweetId: number,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<boolean> {
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

  @Get('user/:userId')
  async getAllTweetsByUserId(@Param('userId') userId: number) {
    return await this.commentService.getAllCommentsCreatedByUser(userId);
  }

  @Patch(':commentId')
  async updateComment(
    @GetAuthenticatedUser() user: User,
    @Param('commentId') commentId: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<boolean> {
    return await this.commentService.updateComment(
      user,
      commentId,
      updateCommentDto,
    );
  }

  @Delete(':commentId')
  async deleteComment(
    @GetAuthenticatedUser() user: User,
    @Param('commentId') commentId: number,
  ): Promise<boolean> {
    return await this.commentService.deleteComment(user, commentId);
  }

  @Get('tweet/:tweetId')
  async getCommentsForTweet(
    @Param('tweetId') tweetId: number,
  ): Promise<Comment[]> {
    return await this.commentService.getAllCommentsForTweet(tweetId);
  }
}
