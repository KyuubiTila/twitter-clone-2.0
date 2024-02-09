import { Controller, Post, Delete, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetAuthenticatedUser } from 'src/auth/get-authenticated-user.decorator';
import { User } from 'src/auth/user.entity';
import { FollowService } from './follow.service';

@Controller('follow')
@UseGuards(AuthGuard())
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post(':userId')
  async follow(
    @Param('userId') userId: number,
    @GetAuthenticatedUser() user: User,
  ): Promise<void> {
    await this.followService.follow(userId, user);
  }

  @Delete(':userId')
  async unfollow(
    @Param('userId') userId: number,
    @GetAuthenticatedUser() user: User,
  ): Promise<void> {
    await this.followService.unfollow(userId, user);
  }
}
