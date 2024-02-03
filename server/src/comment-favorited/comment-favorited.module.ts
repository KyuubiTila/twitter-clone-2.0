import { Module } from '@nestjs/common';
import { CommentFavoritedService } from './comment-favorited.service';
import { CommentFavoritedController } from './comment-favorited.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentFavorited } from './entities/comment-favorited.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommentFavorited, Comment]), AuthModule],
  providers: [CommentFavoritedService],
  controllers: [CommentFavoritedController],
})
export class CommentFavoritedModule {}
