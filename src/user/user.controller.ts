import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('')
  public async createUser(@Body() createUserDto: CreateUserDTO): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }

  @Get('')
  public async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @Get('/:userId')
  public async getUser(@Param('userId') userId: number) {
    return await this.userService.getUser(userId);
  }

  @Patch('/:userId')
  public async editUser(
    @Body() createUserDto: CreateUserDTO,
    @Param('userId') userId: number,
  ): Promise<User> {
    return await this.userService.editUser(userId, createUserDto);
  }

  @Delete('/:userId')
  public async deleteProduct(@Param('userId') userId: number) {
    return await this.userService.deleteUser(userId);
  }
}
