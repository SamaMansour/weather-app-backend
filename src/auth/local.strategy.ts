import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  public readonly prismaService: PrismaService


  async validate(username: string, password: string) {
  //   await this.prismaService.$transaction( async (prisma: Prisma.TransactionClient) => {
  //   const user = await this.authService.validateUser(username, password, prisma);
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   return user;
  // })
  }
}
