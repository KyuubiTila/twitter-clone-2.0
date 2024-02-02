import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { Users } from 'src/auth/users.entity';
import { Tweet } from 'src/tweet/tweet.entity';
import { CommentFavorited } from 'src/comment-favorited/comment-favorited.entity';
import { CommentRetweet } from 'src/comment-retweet/comment-retweet.entity';

@Entity('Comment')
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  // @Column()
  // likesCount: number;

  // @Column()
  // retweetsCount: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => Users, (user) => user.comment)
  user: Users;

  @ManyToOne(() => Tweet, (tweet) => tweet.comment)
  tweet: Tweet;

  @OneToMany(
    () => CommentFavorited,
    (comment_favorited) => comment_favorited.comment,
  )
  comment_favorited: CommentFavorited[];

  @OneToMany(() => CommentRetweet, (comment_retweet) => comment_retweet.comment)
  comment_retweets: CommentRetweet[];

  @Column()
  userId: number;

  @Column()
  tweetId: number;
}
