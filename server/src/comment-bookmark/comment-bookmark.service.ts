import { CommentService } from './../comment/comment.service';
import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentBookmark } from './comment-bookmark.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class CommentBookmarkService {
  constructor(
    @InjectRepository(CommentBookmark)
    private commentBookmarkRepository: Repository<CommentBookmark>,
    private commentService: CommentService,
  ) {}

  async bookmarkComment(user: User, commentId: number): Promise<void> {
    try {
      const commentToBookmark =
        await this.commentService.commentExists(commentId);

      if (!commentToBookmark) {
        throw new NotFoundException('Comment not found');
      }

      const isBookmarked = await this.commentBookmarkRepository.findOne({
        where: {
          userId: user.id,
          commentId,
        },
        select: ['id'],
      });

      if (isBookmarked) {
        throw new ConflictException(
          'Comment has already been bookmarked by you',
        );
      } else {
        const newCommentBookmark = this.commentBookmarkRepository.create({
          user,
          commentId,
        });
        await this.commentBookmarkRepository.insert(newCommentBookmark);
      }

      await this.commentService.updateCommentBookmarkCount(commentId);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to bookmark comment',
        error.message,
      );
    }
  }

  async unbookmarkComment(user: User, commentId: number): Promise<void> {
    try {
      const commentToUnbookmark =
        await this.commentService.commentExists(commentId);

      if (!commentToUnbookmark) {
        throw new NotFoundException('Comment not found');
      }

      const commentBookmark = await this.commentBookmarkRepository.findOne({
        where: {
          userId: user.id,
          commentId,
        },
        select: ['id'],
      });

      if (!commentBookmark) {
        throw new NotFoundException('Comment has not been bookmarked by you');
      } else {
        await this.commentBookmarkRepository.remove(commentBookmark);
      }

      await this.commentService.updateCommentBookmarkCount(commentId);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to unbookmark comment',
        error.message,
      );
    }
  }

  // GET BOOKMARKED COMMENTS  BY USER
  async getBookmarkedCommentsByUser(
    userId: number,
  ): Promise<CommentBookmark[]> {
    try {
      const commentBookmarks = await this.commentBookmarkRepository.find({
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
      return commentBookmarks;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch bookmarked comments',
        error.message,
      );
    }
  }
}
