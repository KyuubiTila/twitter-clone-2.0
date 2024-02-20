import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterCredentialDto } from './dto/register-credential.dto';
import { LoginCredentialDto } from './dto/login-credential.dto';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { Profile } from 'src/profile/profile.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  // SIGNUP
  async signUp(registerCredentialDto: RegisterCredentialDto): Promise<boolean> {
    try {
      const { username, email, password } = registerCredentialDto;

      const isUsernameExisting = await this.userRepository.findOne({
        where: { username },
        select: ['username'],
      });

      if (isUsernameExisting) {
        throw new ConflictException(
          'Username already exists, please choose another username',
        );
      }

      const isEmailExisting = await this.userRepository.findOne({
        where: { email },
        select: ['email'],
      });

      if (isEmailExisting) {
        throw new ConflictException(
          'Email already exists, please choose another email',
        );
      }

      const user = new User();
      user.username = username;
      user.email = email;
      user.password = await this.hashPassword(password);

      // Create a profile with default values
      const profile = new Profile();
      profile.bio;
      profile.image;
      profile.followersCount;
      profile.followingCount;
      profile.user = user;

      // Associate the profile with the user
      user.profile = profile;

      await this.userRepository.insert(user);
      await Profile.insert(profile);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to sign up',
        error.message,
      );
    }
  }

  // SIGN IN
  async validateUserPassword(
    loginCredentialDto: LoginCredentialDto,
  ): Promise<{ accessToken: string }> {
    try {
      const { username, password } = loginCredentialDto;
      const user = await this.userRepository.findOne({
        where: { username },
        select: ['username', 'id', 'password'],
      });

      if (!user) {
        return null;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return null;
      }

      const payload: JwtPayload = { id: user.id, username: user.username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to validate user password',
        error.message,
      );
    }
  }

  // GET USER BY ID
  async getUserByIdService(id: number): Promise<User> {
    try {
      const found = await this.userRepository.findOne({
        where: { id },
        relations: ['profile'],
      });
      if (!found) {
        throw new NotFoundException(`User with ${id} not found`);
      }
      return found;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to get user by ID',
        error.message,
      );
    }
  }
}
