import { Users } from 'src/auth/entities/users.entity';
import { Comment } from 'src/comment/entities/comment.entity';
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

  @ManyToOne(() => Users, (user) => user.comment_retweetedBy)
  user: Users;

  @ManyToOne(() => Comment, (comment) => comment.comment_retweeted)
  comment: Comment;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column()
  userId: number;

  @Column()
  commentId: number;
}
