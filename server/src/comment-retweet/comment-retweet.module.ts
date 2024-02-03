import { Module } from '@nestjs/common';
import { CommentRetweetService } from './comment-retweet.service';
import { CommentRetweetController } from './comment-retweet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRetweet } from './entities/comment-retweet.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommentRetweet, Comment]), AuthModule],

  providers: [CommentRetweetService],
  controllers: [CommentRetweetController],
})
export class CommentRetweetModule {}
