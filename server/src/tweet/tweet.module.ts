import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';
import { Tweet } from './entities/tweet.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet]), AuthModule],
  controllers: [TweetController],
  providers: [TweetService],
})
export class TweetModule {}
