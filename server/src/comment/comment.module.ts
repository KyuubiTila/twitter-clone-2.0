import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { commentService } from './comment.service';
import { Comment } from './comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [CommentController],
  providers: [commentService],
})
export class CommentModule {}
