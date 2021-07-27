import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  login(@Body() userDto: CreateUserDTO) {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDTO) {
    return this.authService.registration(userDto);
  }
}
