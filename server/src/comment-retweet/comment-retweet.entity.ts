import { Users } from 'src/auth/users.entity';
import { Comment } from 'src/comment/comment.entity';
import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('CommentRetweet')
export class CommentRetweet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.comment_retweets)
  user: Users;

  @ManyToOne(() => Comment, (comment) => comment.comment_retweets)
  comment: Comment;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
