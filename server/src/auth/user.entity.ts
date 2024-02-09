import {
  BaseEntity,
  Unique,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { Tweet } from 'src/tweet/tweet.entity';
import { Comment } from 'src/comment/comment.entity';
import { CommentFavorited } from 'src/comment-favorited/comment-favorited.entity';
import { TweetFavorited } from 'src/tweet-favorited/tweet-favorited.entity';
import { TweetRetweet } from 'src/tweet-retweet/tweet-retweet.entity';
import { CommentRetweet } from 'src/comment-retweet/comment-retweet.entity';
import { Profile } from '../profile/profile.entity';
import { TweetBookmark } from 'src/tweet-bookmark/tweet-bookmark.entity';
import { CommentBookmark } from 'src/comment-bookmark/comment-bookmark.entity';
import { Follow } from 'src/follow/follow.entity';

@Entity('User')
@Unique(['username', 'email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => Tweet, (tweet) => tweet.user)
  tweet: Tweet[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comment: Comment[];

  @OneToMany(
    () => CommentFavorited,
    (comment_favoritedBy) => comment_favoritedBy.user,
  )
  comment_favoritedBy: CommentFavorited[];

  @OneToMany(
    () => TweetFavorited,
    (tweet_favoritedBy) => tweet_favoritedBy.user,
  )
  tweet_favoritedBy: TweetFavorited[];

  @OneToMany(() => Follow, (follow) => follow.follower)
  following: Follow[];

  @OneToMany(() => Follow, (follow) => follow.following)
  follower: Follow[];

  @OneToMany(() => TweetRetweet, (tweet_retweetedBy) => tweet_retweetedBy.user)
  tweet_retweetedBy: TweetRetweet[];

  @OneToMany(
    () => CommentRetweet,
    (comment_retweetedBy) => comment_retweetedBy.user,
  )
  comment_retweetedBy: CommentRetweet[];

  @OneToMany(
    () => TweetBookmark,
    (tweet_bookmarkedBy) => tweet_bookmarkedBy.user,
  )
  tweet_bookmarkedBy: TweetBookmark[];

  @OneToMany(
    () => CommentBookmark,
    (comment_bookmarkedBy) => comment_bookmarkedBy.user,
  )
  comment_bookmarkedBy: CommentBookmark[];

  @OneToOne(() => Profile, (profile) => profile.user, {
    nullable: true,
  })
  profile: Profile;
}
