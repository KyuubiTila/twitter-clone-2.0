import { Module } from '@nestjs/common';
import { CommentRetweetService } from './comment-retweet.service';
import { CommentRetweetController } from './comment-retweet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRetweet } from './comment-retweet.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CommentModule } from 'src/comment/comment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentRetweet]),
    AuthModule,
    CommentModule,
  ],

  providers: [CommentRetweetService],
  controllers: [CommentRetweetController],
})
export class CommentRetweetModule {}
