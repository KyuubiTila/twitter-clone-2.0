import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Users } from 'src/auth/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), AuthModule],
  controllers: [FollowController],
  providers: [FollowService],
})
export class FollowModule {}
