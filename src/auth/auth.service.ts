import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string, prisma: Prisma.TransactionClient) {
    const user = await this.userService.findOne(username, prisma);
    if (!user || !(await bcrypt.compare(password, user?.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { password: _, ...result } = user; // Exclude password from the result
    return result;
  }

  async login(user: any) {
    const payload = { username: user.username };
    const access_token = this.jwtService.sign(payload);
    return access_token;
  }
  
}
