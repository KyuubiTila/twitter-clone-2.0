import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/auth/users.entity';
import { CommentRetweet } from './comment-retweet.entity';
import { Comment } from 'src/comment/comment.entity';

@Injectable()
export class CommentRetweetService {
  constructor(
    @InjectRepository(CommentRetweet)
    private commentRetweetRepository: Repository<CommentRetweet>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  // RETWEET COMMENT
  async retweetComment(user: Users, commentId: number): Promise<void> {
    const commentToRetweet = await this.commentRepository.findOne({
      where: { id: commentId },
    });

    if (!commentToRetweet) {
      throw new NotFoundException('Comment not found');
    }

    const hasRetweeted = await this.commentRetweetRepository.findOne({
      where: {
        userId: user.id,
        commentId: commentId,
      },
    });

    if (hasRetweeted) {
      throw new ConflictException('Comment has already been retweeted by you');
    } else {
      const newCommentRetweet = this.commentRetweetRepository.create({
        user,
        commentId,
      });
      await this.commentRetweetRepository.save(newCommentRetweet);
    }

    await commentToRetweet.reload();
  }

  // UNDO RETWEET COMMENT
  async undoRetweetComment(user: Users, commentId: number): Promise<void> {
    const commentToUndoRetweet = await this.commentRepository.findOne({
      where: { id: commentId },
    });

    if (!commentToUndoRetweet) {
      throw new NotFoundException('Comment not found');
    }

    const retweet = await this.commentRetweetRepository.findOne({
      where: {
        userId: user.id,
        commentId,
      },
    });

    if (!retweet) {
      throw new NotFoundException('Comment has not been retweeted by you');
    } else {
      await this.commentRetweetRepository.remove(retweet);
    }

    await commentToUndoRetweet.reload();
  }
}
