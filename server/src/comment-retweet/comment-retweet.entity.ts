import { User } from 'src/auth/user.entity';
import { Comment } from 'src/comment/comment.entity';
import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
} from 'typeorm';

@Entity('CommentRetweet')
export class CommentRetweet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.comment_retweetedBy)
  user: User;

  @ManyToOne(() => Comment, (comment) => comment.comment_retweeted)
  comment: Comment;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column()
  userId: number;

  @Column()
  commentId: number;
}
