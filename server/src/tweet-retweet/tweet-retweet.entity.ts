import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
} from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Tweet } from 'src/tweet/tweet.entity';

@Entity('TweetRetweet')
export class TweetRetweet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.tweet_retweetedBy)
  user: User;

  @ManyToOne(() => Tweet, (tweet) => tweet.tweet_retweeted)
  tweet: Tweet;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column()
  userId: number;

  @Column()
  tweetId: number;
}
