import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/auth/users.entity';
import { CommentFavorited } from './comment-favorited.entity';
import { Comment } from 'src/comment/comment.entity';

@Injectable()
export class CommentFavoritedService {
  constructor(
    @InjectRepository(CommentFavorited)
    private commentFavoritedRepository: Repository<CommentFavorited>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  // LIKE COMMENT
  async likeComment(user: Users, commentId: number): Promise<void> {
    const commentToLike = await this.commentRepository.findOne({
      where: { id: commentId },
    });

    if (!commentToLike) {
      throw new NotFoundException('Comment not found');
    }

    const isLiked = await this.commentFavoritedRepository.findOne({
      where: {
        userId: user.id,
        commentId,
      },
    });

    if (isLiked) {
      throw new ConflictException('Comment has already been liked by you');
    } else {
      const newCommentFavorite = this.commentFavoritedRepository.create({
        user,
        commentId,
      });
      await this.commentFavoritedRepository.save(newCommentFavorite);
    }

    await this.updateCommentFavoritesCount(commentId);
    await commentToLike.reload();
  }

  // UNLIKE COMMENT
  async unlikeComment(user: Users, commentId: number): Promise<void> {
    const commentToUnlike = await this.commentRepository.findOne({
      where: { id: commentId },
    });

    if (!commentToUnlike) {
      throw new NotFoundException('Comment not found');
    }

    const commentFavorite = await this.commentFavoritedRepository.findOne({
      where: {
        userId: user.id,
        commentId,
      },
    });

    if (!commentFavorite) {
      throw new NotFoundException('Comment has not been liked by you');
    } else {
      await this.commentFavoritedRepository.remove(commentFavorite);
    }

    await this.updateCommentFavoritesCount(commentId);
    await commentToUnlike.reload();
  }

  // UPDATE COMMENT FAVORITE COUNT
  async updateCommentFavoritesCount(
    commentId: number,
  ): Promise<{ success: boolean; message: string }> {
    const count = await this.commentFavoritedRepository.count({
      where: { commentId },
    });
    await this.commentRepository.update(
      { id: commentId },
      { likesCount: count },
    );

    return {
      success: true,
      message: 'Comment likes count updated successfully',
    };
  }
}
