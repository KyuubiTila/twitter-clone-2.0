import { LoginCredentialDto } from './dto/login-credential.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterCredentialDto } from './dto/register-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signUp')
  async signUp(@Body() registerCredentialDto: RegisterCredentialDto) {
    try {
      await this.authService.signUp(registerCredentialDto);
      return { message: 'User created successfully' };
    } catch (error) {
      throw error;
    }
  }

  @Post('/signIn')
  async signIn(
    @Body() loginCredentialDto: LoginCredentialDto,
  ): Promise<{ accessToken: string }> {
    const result =
      await this.authService.validateUserPassword(loginCredentialDto);

    if (!result) {
      throw new UnauthorizedException('Invalid login credentials');
    }

    return result;
  }

  @Get('/:id')
  getUserById(@Param('id') id: number) {
    return this.authService.getUserByIdService(id);
  }
}
