import { CreateTweetDto } from './dto/create-tweet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { Users } from 'src/auth/users.entity';
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
    tweet.userId = user.id;

    return await this.tweetRepository.save(tweet);
  }

  // UPDATE TWEET
  async updateTweet(
    user: Users,
    id: number,
    updateTweetDto: UpdateTweetDto,
  ): Promise<Tweet> {
    const tweetToUpdate = await this.tweetRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!tweetToUpdate) {
      throw new NotFoundException(
        'You can not update this tweet, you did not create it',
      );
    }

    tweetToUpdate.content = updateTweetDto.content;

    return await this.tweetRepository.save(tweetToUpdate);
  }

  // GET ALL TWEETS
  async getAllTweets(): Promise<Tweet[]> {
    return await this.tweetRepository.find();
  }

  // GET TWEET BY ID
  async getTweetById(id: number): Promise<Tweet> {
    const tweet = await this.tweetRepository.findOne({
      where: { id },
      relations: ['user', 'user.profile'],
    });

    if (!tweet) {
      throw new NotFoundException('Tweet not found');
    }

    return tweet;
  }

  // DELETE TWEET BY ID
  async deleteTweetById(user: Users, id: number): Promise<void> {
    const tweetToBeDeleted = await this.tweetRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!tweetToBeDeleted) {
      throw new NotFoundException(
        'You can not not delete tweet you did not create',
      );
    }

    await this.tweetRepository.remove(tweetToBeDeleted);
  }
}
