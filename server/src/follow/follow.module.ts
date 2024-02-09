import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Follow } from './follow.entity';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [TypeOrmModule.forFeature([Follow]), AuthModule, ProfileModule],
  controllers: [FollowController],
  providers: [FollowService],
})
export class FollowModule {}
