import { Module } from '@nestjs/common';
import { CommentRetweetService } from './comment-retweet.service';
import { CommentRetweetController } from './comment-retweet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRetweet } from './comment-retweet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentRetweet])],

  providers: [CommentRetweetService],
  controllers: [CommentRetweetController],
})
export class CommentRetweetModule {}
