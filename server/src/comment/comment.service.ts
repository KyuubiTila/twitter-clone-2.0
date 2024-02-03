import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/auth/entities/users.entity';
import { Tweet } from 'src/tweet/entities/tweet.entity';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Tweet)
    private tweetRepository: Repository<Tweet>,
  ) {}

  // CREATE COMMENT
  async createComment(
    user: Users,
    tweetId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const tweet = await this.tweetRepository.findOne({
      where: { id: tweetId },
    });

    if (!tweet) {
      throw new NotFoundException('Tweet not found');
    }

    const newComment = new Comment();
    newComment.content = createCommentDto.content;
    newComment.user = user;
    newComment.tweet = tweet;

    return await this.commentRepository.save(newComment);
  }

  // GET COMMENT BY ID
  async getCommentById(commentId: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return comment;
  }

  // UPDATE COMMENT
  async updateComment(
    user: Users,
    commentId: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const commentToUpdate = await this.getCommentById(commentId);

    if (commentToUpdate.userId !== user.id) {
      throw new UnauthorizedException(
        'You are not authorized to update this comment',
      );
    }

    commentToUpdate.content = updateCommentDto.content;

    return await this.commentRepository.save(commentToUpdate);
  }

  // DELETE COMMENT
  async deleteComment(user: Users, commentId: number): Promise<void> {
    const commentToDelete = await this.getCommentById(commentId);

    if (commentToDelete.userId !== user.id) {
      throw new UnauthorizedException(
        'You are not authorized to delete this comment',
      );
    }

    await this.commentRepository.remove(commentToDelete);
  }

  // GET ALL COMMENTS FOR A TWEET
  async getCommentsForTweet(tweetId: number): Promise<Comment[]> {
    return await this.commentRepository.find({
      where: { tweetId },
    });
  }
}
