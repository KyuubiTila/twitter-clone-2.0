import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterCredentialDto } from './dto/register-credential.dto';
import { Users } from './entities/users.entity';
import { LoginCredentialDto } from './dto/login-credential.dto';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'src/profile/entities/profile.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  // SIGNUP
  async signUp(registerCredentialDto: RegisterCredentialDto): Promise<boolean> {
    const { username, email, password } = registerCredentialDto;

    const isUsernameExisting = await this.userRepository.findOne({
      where: { username },
    });

    if (isUsernameExisting) {
      throw new ConflictException(
        'Username already exists, please choose another username',
      );
    }

    const isEmailExisting = await this.userRepository.findOne({
      where: { email },
    });

    if (isEmailExisting) {
      throw new ConflictException(
        'Email already exists, please choose another email',
      );
    }

    const user = new Users();
    user.username = username;
    user.email = email;
    user.password = await this.hashPassword(password);

    // Create a profile with default values
    const profile = new Profile();
    profile.bio;
    profile.image;

    // Associate the profile with the user
    user.profile = profile;

    await this.userRepository.save(user);
    return true;
  }

  // SIGN IN
  async validateUserPassword(
    loginCredentialDto: LoginCredentialDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = loginCredentialDto;
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }

  // GET USER BY ID
  async getUserByIdService(id: number): Promise<Users> {
    const found = await this.userRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
    if (!found) {
      throw new NotFoundException(`User with ${id} not found`);
    }
    return found;
  }
}
