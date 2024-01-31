import { Users } from 'src/auth/users.entity';
import { Comment } from 'src/comment/comment.entity';
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

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => Users, (user) => user.tweet)
  user: Users;

  @OneToMany(() => Comment, (comment) => comment.tweet)
  comment: Comment[];

  @OneToMany(() => TweetFavorited, (tweet_favorited) => tweet_favorited.tweet)
  tweet_favorited: TweetFavorited[];

  @OneToMany(() => TweetRetweet, (tweet_retweet) => tweet_retweet.tweet)
  tweet_retweets: TweetRetweet[];

  @Column()
  userId: number;
}
