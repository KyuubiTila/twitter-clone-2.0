import {
  BaseEntity,
  Unique,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  Column,
} from 'typeorm';
import { Tweet } from 'src/tweet/entities/tweet.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { CommentFavorited } from 'src/comment-favorited/entities/comment-favorited.entity';
import { TweetFavorited } from 'src/tweet-favorited/entities/tweet-favorited.entity';
import { TweetRetweet } from 'src/tweet-retweet/entities/tweet-retweet.entity';
import { CommentRetweet } from 'src/comment-retweet/entities/comment-retweet.entity';
import { Profile } from '../../profile/entities/profile.entity';
import { TweetBookmark } from 'src/tweet-bookmark/entities/tweet-bookmark.entity';
import { CommentBookmark } from 'src/comment-bookmark/entities/comment-bookmark.entity';

@Entity('Users')
@Unique(['username', 'email'])
export class Users extends BaseEntity {
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

  @ManyToMany(() => Users, (user) => user.following)
  @JoinTable({
    name: 'user_following',
    joinColumn: { name: 'followedUserId' },
    inverseJoinColumn: { name: 'followerUserId' },
  })
  followers: Users[];

  @ManyToMany(() => Users, (user) => user.followers)
  following: Users[];

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
    cascade: true,
    nullable: true,
  })
  profile: Profile;
}
