import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { User } from 'src/auth/user.entity';

@Entity('Follow')
export class Follow extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.follower)
  follower: User[];

  @ManyToOne(() => User, (user) => user.following)
  following: User[];

  @Column()
  followerId: number;

  @Column()
  followingId: number;
}
