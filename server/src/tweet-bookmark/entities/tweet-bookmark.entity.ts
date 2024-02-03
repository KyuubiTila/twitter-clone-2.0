import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Users } from 'src/auth/entities/users.entity';
import { Tweet } from 'src/tweet/entities/tweet.entity';

@Entity('TweetBookmarked')
export class TweetBookmark extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.tweet_bookmarkedBy)
  user: Users;

  @ManyToOne(() => Tweet, (tweet) => tweet.tweet_bookmarked)
  tweet: Tweet;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column()
  userId: number;

  @Column()
  tweetId: number;
}
