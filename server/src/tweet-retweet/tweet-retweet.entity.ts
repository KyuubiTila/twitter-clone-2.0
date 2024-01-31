import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { Users } from 'src/auth/users.entity';
import { Tweet } from 'src/tweet/tweet.entity';

@Entity('TweetRetweet')
export class TweetRetweet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.tweet_retweets)
  user: Users;

  @ManyToOne(() => Tweet, (tweet) => tweet.tweet_retweets)
  tweet: Tweet;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
