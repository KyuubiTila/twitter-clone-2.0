import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { TweetModule } from './tweet/tweet.module';
import { CommentModule } from './comment/comment.module';
import { CommentFavoritedModule } from './comment-favorited/comment-favorited.module';
import { TweetFavoritedModule } from './tweet-favorited/tweet-favorited.module';
import { TweetRetweetModule } from './tweet-retweet/tweet-retweet.module';
import { CommentRetweetModule } from './comment-retweet/comment-retweet.module';
import { ProfileModule } from './profile/profile.module';
import { FollowModule } from './follow/follow.module';
import { CommentBookmarkModule } from './comment-bookmark/comment-bookmark.module';
import { TweetBookmarkModule } from './tweet-bookmark/tweet-bookmark.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    TweetModule,
    CommentModule,
    CommentFavoritedModule,
    TweetFavoritedModule,
    TweetRetweetModule,
    CommentRetweetModule,
    ProfileModule,
    FollowModule,
    CommentBookmarkModule,
    TweetBookmarkModule,
  ],
})
export class AppModule {}
