import { User } from 'src/auth/user.entity';
import { Comment } from 'src/comment/comment.entity';
import { TweetBookmark } from 'src/tweet-bookmark/tweet-bookmark.entity';
import { TweetFavorited } from 'src/tweet-favorited/tweet-favorited.entity';
import { TweetRetweet } from 'src/tweet-retweet/tweet-retweet.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('Tweet')
export class Tweet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ default: 0 })
  likesCount: number;

  @Column({ default: 0 })
  retweetsCount: number;

  @Column({ default: 0 })
  bookmarksCount: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.tweet)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.tweet)
  comment: Comment[];

  @OneToMany(() => TweetFavorited, (tweet_favorited) => tweet_favorited.tweet)
  tweet_favorited: TweetFavorited[];

  @OneToMany(() => TweetRetweet, (tweet_retweeted) => tweet_retweeted.tweet)
  tweet_retweeted: TweetRetweet[];

  @OneToMany(() => TweetBookmark, (tweet_bookmarked) => tweet_bookmarked.tweet)
  tweet_bookmarked: TweetBookmark[];

  @Column()
  userId: number;
}
