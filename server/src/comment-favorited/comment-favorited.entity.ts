import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Users } from 'src/auth/users.entity';
import { Comment } from 'src/comment/comment.entity';

@Entity('CommentFavorited')
export class CommentFavorited extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.comment_favoritedBy)
  user: Users;

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
