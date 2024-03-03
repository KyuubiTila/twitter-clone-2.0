import { Repository } from 'typeorm';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Comment } from './comment.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentBookmark } from 'src/comment-bookmark/comment-bookmark.entity';
import { CommentFavorited } from 'src/comment-favorited/comment-favorited.entity';
import { CommentRetweet } from 'src/comment-retweet/comment-retweet.entity';
import { TweetService } from 'src/tweet/tweet.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private tweetService: TweetService,
  ) {}

  // CREATE COMMENT
  async createComment(
    user: User,
    tweetId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<boolean> {
    try {
      const tweet = await this.tweetService.returnTweetUserId(tweetId);

      if (!tweet) {
        throw new NotFoundException('Tweet not found');
      }

      const newComment = this.commentRepository.create({
        content: createCommentDto.content,
        user,
        tweetId: tweet.id,
      });

      await this.commentRepository.insert(newComment);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create comment',
        error.message,
      );
    }
  }

  // GET COMMENT BY ID
  async getCommentById(commentId: number): Promise<Comment> {
    try {
      const comment = await this.commentRepository.findOneOrFail({
        where: { id: commentId },
        relations: [
          'user',
          'user.profile',
          'user.follower',
          'comment_favorited',
          'comment_retweeted',
          'comment_bookmarked',
        ],
      });

      return comment;
    } catch (error) {
      throw new NotFoundException('Comment not found');
    }
  }

  // GET ALL COMMENTS CREATED BY USER
  async getAllCommentsCreatedByUser(userId: number): Promise<Comment[]> {
    try {
      return await this.commentRepository.find({
        where: { userId },
        relations: [
          'user',
          'comment_favorited',
          'comment_retweeted',
          'comment_bookmarked',
        ],
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve all comments created by user ${userId}`,
        error.message,
      );
    }
  }

  // UPDATE COMMENT
  async updateComment(
    user: User,
    commentId: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<boolean> {
    try {
      const commentToUpdate = await this.returnCommentUserId(commentId);

      if (commentToUpdate.userId !== user.id) {
        throw new UnauthorizedException(
          'You are not authorized to update this comment',
        );
      }
      await this.commentRepository.update(
        { id: commentId },
        { content: updateCommentDto.content },
      );
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update comment',
        error.message,
      );
    }
  }

  // DELETE COMMENT
  async deleteComment(user: User, commentId: number): Promise<boolean> {
    try {
      const commentToDelete = await this.returnCommentUserId(commentId);

      if (commentToDelete.userId !== user.id) {
        throw new UnauthorizedException(
          'You are not authorized to delete this comment',
        );
      }

      await this.commentRepository.remove(commentToDelete);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to delete comment',
        error.message,
      );
    }
  }

  // GET ALL COMMENTS FOR A TWEET
  async getAllCommentsForTweet(tweetId: number): Promise<Comment[]> {
    try {
      return await this.commentRepository.find({
        where: { tweetId },
        relations: [
          'user',
          'user.profile',
          'user.follower',
          'comment_favorited',
          'comment_retweeted',
          'comment_bookmarked',
        ],
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve comments',
        error.message,
      );
    }
  }

  // VERIFY COMMENT BY RETURNING USERID
  async returnCommentUserId(commentId: number): Promise<Comment> {
    try {
      const comment = await this.commentRepository.findOneOrFail({
        where: { id: commentId },
        // select: ['userId'],
      });

      return comment;
    } catch (error) {
      throw new NotFoundException('Comment not found');
    }
  }

  // CHECK IF COMMENT EXISTS BY ID
  async commentExists(commentId: number): Promise<boolean> {
    try {
      const comment = await this.commentRepository.findOne({
        where: { id: commentId },
        select: ['id'],
      });

      return !!comment;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to check comment existence',
        error.message,
      );
    }
  }

  // UPDATE COMMENT BOOKMARK COUNT
  async updateCommentBookmarkCount(commentId: number): Promise<void> {
    try {
      const count = await CommentBookmark.count({
        where: { commentId },
      });

      await this.commentRepository.update(
        { id: commentId },
        { bookmarksCount: count },
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update comment bookmark count',
        error.message,
      );
    }
  }

  // UPDATE COMMENT LIKES COUNT
  async updateCommentLikesCount(commentId: number): Promise<void> {
    try {
      const count = await CommentFavorited.count({
        where: { commentId },
      });
      await this.commentRepository.update(
        { id: commentId },
        { likesCount: count },
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update comment like count',
        error.message,
      );
    }
  }

  // UPDATE COMMENT RETWEET COUNT
  async updateCommentRetweetCount(commentId: number): Promise<void> {
    try {
      const count = await CommentRetweet.count({
        where: { commentId },
      });
      await this.commentRepository.update(
        { id: commentId },
        { retweetsCount: count },
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update comment retweet count',
        error.message,
      );
    }
  }
}
