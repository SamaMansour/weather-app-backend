import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';


@Injectable()
export class UserService {
  constructor() { }

  async createUser(username: string, password: string, prisma: Prisma.TransactionClient) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
  }

  async findOne(username: string, prisma: Prisma.TransactionClient) {
    return prisma.user.findUnique({ where: { username } });
  }
}
