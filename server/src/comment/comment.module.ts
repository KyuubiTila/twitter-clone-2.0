import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { AuthModule } from 'src/auth/auth.module';
import { TweetModule } from 'src/tweet/tweet.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), AuthModule, TweetModule],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
