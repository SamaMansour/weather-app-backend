import { Controller, Request, Post, UseGuards, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly prismaService: PrismaService
  ) { }

  @Post('signup')
  async signUp(@Body() body: { username: string; password: string }) {

    await this.prismaService.$transaction( async (prisma: Prisma.TransactionClient) => {
          await this.userService.createUser(body.username, body.password,prisma);
   
          return { message: 'User created successfully' };

    })
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    await this.prismaService.$transaction( async (prisma: Prisma.TransactionClient) => {
    const isValidUser = await this.authService.validateUser(body.username, body.password, prisma);

    if (!isValidUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    
    return { message: 'Login successful' };
  })
  }
}
