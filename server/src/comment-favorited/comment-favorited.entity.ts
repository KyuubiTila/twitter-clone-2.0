import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from 'src/auth/user.entity';
import { Comment } from 'src/comment/comment.entity';

@Entity('CommentFavorited')
export class CommentFavorited extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.comment_favoritedBy)
  user: User;

  @ManyToOne(() => Comment, (comment) => comment.comment_favorited)
  comment: Comment;

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
  commentId: number;
}
