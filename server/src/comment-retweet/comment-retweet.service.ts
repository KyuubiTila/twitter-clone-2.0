import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { CommentRetweet } from './comment-retweet.entity';
import { CommentService } from 'src/comment/comment.service';

@Injectable()
export class CommentRetweetService {
  constructor(
    @InjectRepository(CommentRetweet)
    private commentRetweetRepository: Repository<CommentRetweet>,
    private commentService: CommentService,
  ) {}

  // RETWEET COMMENT
  async retweetComment(user: User, commentId: number): Promise<void> {
    try {
      const commentToRetweet =
        await this.commentService.commentExists(commentId);

      if (!commentToRetweet) {
        throw new NotFoundException('Comment not found');
      }

      const hasRetweeted = await this.commentRetweetRepository.findOne({
        where: {
          userId: user.id,
          commentId: commentId,
        },
        select: ['id'],
      });

      if (hasRetweeted) {
        throw new ConflictException(
          'Comment has already been retweeted by you',
        );
      } else {
        const newCommentRetweet = this.commentRetweetRepository.create({
          user,
          commentId,
        });
        await this.commentRetweetRepository.insert(newCommentRetweet);
      }

      await this.commentService.updateCommentRetweetCount(commentId);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retweet comment',
        error.message,
      );
    }
  }

  // UNDO RETWEET COMMENT
  async undoRetweetComment(user: User, commentId: number): Promise<void> {
    try {
      const commentToUndoRetweet =
        await this.commentService.commentExists(commentId);

      if (!commentToUndoRetweet) {
        throw new NotFoundException('Comment not found');
      }

      const retweet = await this.commentRetweetRepository.findOne({
        where: {
          userId: user.id,
          commentId,
        },
        select: ['id'],
      });

      if (!retweet) {
        throw new NotFoundException('Comment has not been retweeted by you');
      } else {
        await this.commentRetweetRepository.remove(retweet);
      }

      await this.commentService.updateCommentRetweetCount(commentId);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to undo retweet comment',
        error.message,
      );
    }
  }

  // GET RETWEETED COMMENTS BY USER
  async getRetweetedCommentsByUser(userId: number): Promise<CommentRetweet[]> {
    try {
      const commentRetweets = await this.commentRetweetRepository.find({
        where: { userId },
        relations: [
          'comment',
          'comment.user',
          'comment.user.follower',
          'comment.user.profile',
          'comment.comment_favorited',
          'comment.comment_retweeted',
          'comment.comment_bookmarked',
        ],
      });
      return commentRetweets;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch retweeted comments',
        error.message,
      );
    }
  }
}
