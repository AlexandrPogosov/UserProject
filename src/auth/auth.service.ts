import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDTO) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDTO) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new BadRequestException();
    }
    userDto.password = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser(userDto);
    return this.generateToken(user);
  }

  private async generateToken(user: User): Promise<{ token: string }> {
    const payload = { email: user.email, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDTO) {
    const user = await this.userService.getUserByEmail(userDto.email);
    console.log(user);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException();
  }
}
