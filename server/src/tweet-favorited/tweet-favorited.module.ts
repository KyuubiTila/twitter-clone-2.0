import { Module } from '@nestjs/common';
import { TweetFavoritedService } from './tweet-favorited.service';
import { TweetFavoritedController } from './tweet-favorited.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetFavorited } from './tweet-favorited.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Tweet } from 'src/tweet/tweet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TweetFavorited, Tweet]), AuthModule],
  providers: [TweetFavoritedService],
  controllers: [TweetFavoritedController],
})
export class TweetFavoritedModule {}
