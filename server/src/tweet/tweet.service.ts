import { CreateTweetDto } from './dto/create-tweet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tweet } from './entities/tweet.entity';
import { Users } from 'src/auth/entities/users.entity';
import { UpdateTweetDto } from './dto/update-tweet.dto';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(Tweet)
    private tweetRepository: Repository<Tweet>,
  ) {}

  // CREATE TWEET
  async createTweet(
    user: Users,
    createTweetDto: CreateTweetDto,
  ): Promise<Tweet> {
    const tweet = new Tweet();
    tweet.content = createTweetDto.content;
    tweet.user = user;

    return await this.tweetRepository.save(tweet);
  }

  // GET TWEET BY ID
  async getTweetById(tweetId: number): Promise<Tweet> {
    const tweet = await this.tweetRepository.findOne({
      where: { id: tweetId },
      relations: ['user', 'user.profile'],
    });

    if (!tweet) {
      throw new NotFoundException('Tweet not found');
    }

    return tweet;
  }

  // UPDATE TWEET
  async updateTweet(
    user: Users,
    tweetId: number,
    updateTweetDto: UpdateTweetDto,
  ): Promise<Tweet> {
    const tweetToUpdate = await this.getTweetById(tweetId);

    if (tweetToUpdate.userId !== user.id) {
      throw new NotFoundException(
        'You can not update this tweet, you did not create it',
      );
    }

    tweetToUpdate.content = updateTweetDto.content;

    return await this.tweetRepository.save(tweetToUpdate);
  }

  // DELETE TWEET BY ID
  async deleteTweetById(user: Users, tweetId: number): Promise<void> {
    const tweetToBeDeleted = await this.getTweetById(tweetId);

    if (tweetToBeDeleted.userId !== user.id) {
      throw new NotFoundException(
        'You can not not delete tweet you did not create',
      );
    }

    await this.tweetRepository.remove(tweetToBeDeleted);
  }

  // GET ALL TWEETS
  async getAllTweets(): Promise<Tweet[]> {
    return await this.tweetRepository.find();
  }
}
