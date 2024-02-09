import { Module } from '@nestjs/common';
import { CommentFavoritedService } from './comment-favorited.service';
import { CommentFavoritedController } from './comment-favorited.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentFavorited } from './comment-favorited.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CommentModule } from 'src/comment/comment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentFavorited]),
    AuthModule,
    CommentModule,
  ],
  providers: [CommentFavoritedService],
  controllers: [CommentFavoritedController],
})
export class CommentFavoritedModule {}
