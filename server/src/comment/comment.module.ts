import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { Tweet } from 'src/tweet/tweet.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Tweet]), AuthModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
