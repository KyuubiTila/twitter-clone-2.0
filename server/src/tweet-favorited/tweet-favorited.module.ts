import { Module } from '@nestjs/common';
import { TweetFavoritedService } from './tweet-favorited.service';
import { TweetFavoritedController } from './tweet-favorited.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetFavorited } from './tweet-favorited.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TweetFavorited])],
  providers: [TweetFavoritedService],
  controllers: [TweetFavoritedController],
})
export class TweetFavoritedModule {}
