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

import { Users } from 'src/auth/entities/users.entity';
import { Tweet } from 'src/tweet/entities/tweet.entity';
import { CommentFavorited } from 'src/comment-favorited/entities/comment-favorited.entity';
import { CommentRetweet } from 'src/comment-retweet/entities/comment-retweet.entity';
import { CommentBookmark } from 'src/comment-bookmark/entities/comment-bookmark.entity';

@Entity('Comment')
export class Comment extends BaseEntity {
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

  @ManyToOne(() => Users, (user) => user.comment)
  user: Users;

  @ManyToOne(() => Tweet, (tweet) => tweet.comment)
  tweet: Tweet;

  @OneToMany(
    () => CommentFavorited,
    (comment_favorited) => comment_favorited.comment,
  )
  comment_favorited: CommentFavorited[];

  @OneToMany(
    () => CommentRetweet,
    (comment_retweeted) => comment_retweeted.comment,
  )
  comment_retweeted: CommentRetweet[];

  @OneToMany(
    () => CommentBookmark,
    (comment_bookmarked) => comment_bookmarked.comment,
  )
  comment_bookmarked: CommentBookmark[];

  @Column()
  userId: number;

  @Column()
  tweetId: number;
}
