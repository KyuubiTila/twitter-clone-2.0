import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { CommentFavorited } from './comment-favorited.entity';
import { CommentService } from 'src/comment/comment.service';

@Injectable()
export class CommentFavoritedService {
  constructor(
    @InjectRepository(CommentFavorited)
    private commentFavoritedRepository: Repository<CommentFavorited>,
    private commentService: CommentService,
  ) {}

  // LIKE COMMENT
  async likeComment(user: User, commentId: number): Promise<void> {
    try {
      const commentToLike = await this.commentService.commentExists(commentId);

      if (!commentToLike) {
        throw new NotFoundException('Comment not found');
      }

      const isLiked = await this.commentFavoritedRepository.findOne({
        where: {
          userId: user.id,
          commentId,
        },
        select: ['id'],
      });

      if (isLiked) {
        throw new ConflictException('Comment has already been liked by you');
      } else {
        const newCommentFavorite = this.commentFavoritedRepository.create({
          user,
          commentId,
        });
        await this.commentFavoritedRepository.insert(newCommentFavorite);
      }

      await this.commentService.updateCommentLikesCount(commentId);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to like comment',
        error.message,
      );
    }
  }

  // UNLIKE COMMENT
  async unlikeComment(user: User, commentId: number): Promise<void> {
    try {
      const commentToUnlike =
        await this.commentService.commentExists(commentId);

      if (!commentToUnlike) {
        throw new NotFoundException('Comment not found');
      }

      const commentFavorite = await this.commentFavoritedRepository.findOne({
        where: {
          userId: user.id,
          commentId,
        },
        select: ['id'],
      });

      if (!commentFavorite) {
        throw new NotFoundException('Comment has not been liked by you');
      } else {
        await this.commentFavoritedRepository.remove(commentFavorite);
      }

      await this.commentService.updateCommentLikesCount(commentId);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to unlike comment',
        error.message,
      );
    }
  }

  // GET FAVORITED COMMENTS  BY USER
  async getFavoritedCommentsByUser(
    userId: number,
  ): Promise<CommentFavorited[]> {
    try {
      const commentFavorited = await this.commentFavoritedRepository.find({
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
      return commentFavorited;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch favorited comments',
        error.message,
      );
    }
  }
}
