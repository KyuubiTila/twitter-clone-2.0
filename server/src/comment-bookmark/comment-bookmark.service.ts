import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/auth/entities/users.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { CommentBookmark } from './entities/comment-bookmark.entity';

@Injectable()
export class CommentBookmarkService {
  constructor(
    @InjectRepository(CommentBookmark)
    private commentBookmarkRepository: Repository<CommentBookmark>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  // BOOKMARK COMMENT
  async bookmarkComment(user: Users, commentId: number): Promise<void> {
    const commentToBookmark = await this.commentRepository.findOne({
      where: { id: commentId },
    });

    if (!commentToBookmark) {
      throw new NotFoundException('Comment not found');
    }

    const isBookmarked = await this.commentBookmarkRepository.findOne({
      where: {
        userId: user.id,
        commentId,
      },
    });

    if (isBookmarked) {
      throw new ConflictException('Comment has already been bookmarked by you');
    } else {
      const newCommentBookmark = this.commentBookmarkRepository.create({
        user,
        commentId,
      });
      await this.commentBookmarkRepository.save(newCommentBookmark);
    }

    await this.updateCommentFavoritesCount(commentId);
    await commentToBookmark.reload();
  }

  // UNBOOKMARK COMMENT
  async unbookmarkComment(user: Users, commentId: number): Promise<void> {
    const commentToUnbookmark = await this.commentRepository.findOne({
      where: { id: commentId },
    });

    if (!commentToUnbookmark) {
      throw new NotFoundException('Comment not found');
    }

    const commentBookmark = await this.commentBookmarkRepository.findOne({
      where: {
        userId: user.id,
        commentId,
      },
    });

    if (!commentBookmark) {
      throw new NotFoundException('Comment has not been bookmarked by you');
    } else {
      await this.commentBookmarkRepository.remove(commentBookmark);
    }

    await this.updateCommentFavoritesCount(commentId);
    await commentToUnbookmark.reload();
  }

  // UPDATE COMMENT BOOKMARK COUNT
  async updateCommentFavoritesCount(commentId: number): Promise<void> {
    const count = await this.commentBookmarkRepository.count({
      where: { commentId },
    });

    await this.commentRepository.update(
      { id: commentId },
      { bookmarksCount: count },
    );
  }
}
