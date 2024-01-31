import { Module } from '@nestjs/common';
import { CommentFavoritedService } from './comment-favorited.service';
import { CommentFavoritedController } from './comment-favorited.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentFavorited } from './comment-favorited.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentFavorited])],
  providers: [CommentFavoritedService],
  controllers: [CommentFavoritedController],
})
export class CommentFavoritedModule {}
