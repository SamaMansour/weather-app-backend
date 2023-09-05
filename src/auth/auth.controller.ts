import { Controller, Post, Request, UseGuards, Body, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.signup(createUserDto);
    if (!user) {
      throw new BadRequestException('User registration failed');
    }
    const token = await this.authService.login(user);
    return { user, token };
  }

  @Post('login')
  async login(@Request() req) {
    const user = await this.authService.validateUser(req.body.username, req.body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.authService.login(user);
    return { user, token };
  }
}
