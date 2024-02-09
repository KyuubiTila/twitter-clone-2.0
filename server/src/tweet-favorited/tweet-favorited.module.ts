import { Module } from '@nestjs/common';
import { TweetFavoritedService } from './tweet-favorited.service';
import { TweetFavoritedController } from './tweet-favorited.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetFavorited } from './tweet-favorited.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TweetModule } from 'src/tweet/tweet.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TweetFavorited]),
    AuthModule,
    TweetModule,
  ],
  providers: [TweetFavoritedService],
  controllers: [TweetFavoritedController],
})
export class TweetFavoritedModule {}
