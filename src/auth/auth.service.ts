import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      throw new UnauthorizedException('User with this email already exists');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User();
    newUser.username = username;
    newUser.password = hashedPassword;

    await newUser.save();

    return newUser;
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await User.findOne({ username });

    if (!user) {
      return null; 
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null; 
    }

    return user;
  }

  async login(user: User): Promise<{ access_token: string }> {
    const payload = { sub: user.id, username: user.username }; 
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
