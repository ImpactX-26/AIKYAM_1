import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && await bcrypt.compare(pass, user.password_hash)) {
      const { password_hash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userDto: any) {
    const user = await this.validateUser(userDto.email, userDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials or un-authorized email');
    }
    return {
      message: 'Login successful',
      user: user,
    };
  }

  async register(userDto: any) {
    const existingUser = await this.usersService.findOne(userDto.email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }
    const passwordHash = await bcrypt.hash(userDto.password, 10);
    const newUser = await this.usersService.create({
      email: userDto.email,
      password_hash: passwordHash,
      role: userDto.role || 'APPLICANT',
    });
    const { password_hash, ...result } = newUser;
    return result;
  }
}
