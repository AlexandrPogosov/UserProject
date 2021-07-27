import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserProjectsDto } from '../user-project/dto/user-projects.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({
    summary: 'Create a new User',
  })
  @ApiBody({
    description: 'User that we want to create',
    type: CreateUserDTO,
  })
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: User,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
    type: Error,
  })
  @Post('')
  @Header('Content-Type', 'application/json; charset=UTF-8')
  public async createUser(@Body() createUserDto: CreateUserDTO): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }


  @ApiOperation({
    summary: 'Get all users in system',
  })
  @ApiOkResponse({
    type: User,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: Error,
  })
  @Get('')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Header('Cache-Control', 'no-store, no-cache, must-revalidate')
  @Header('Content-Type', 'application/json; charset=UTF-8')
  public async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @ApiOperation({
    summary: 'Get all users with projects in system',
  })
  @ApiOkResponse({
    type: UserProjectsDto,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: Error,
  })
  @Get('/projects')
  @Header('Cache-Control', 'no-store, no-cache, must-revalidate')
  @Header('Content-Type', 'application/json; charset=UTF-8')
  public async getUsersWithProjects(): Promise<User[]> {
    return await this.userService.findUsersWithProjectsAll();
  }

  @ApiOperation({
    summary: 'Get user in system',
  })
  @ApiParam({
    name: 'userId',
    description: 'ID of user that we want to find',
  })
  @ApiOkResponse({
    description: 'Here is user which you want to find',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: Error,
  })
  @Get('/:userId')
  @Header('Cache-Control', 'no-store, no-cache, must-revalidate')
  @Header('Content-Type', 'application/json; charset=UTF-8')
  public async getUser(@Param('userId') userId: number) {
    return await this.userService.getUser(userId);
  }

  @ApiOperation({
    summary: 'Update user with give ID',
  })
  @ApiParam({
    name: 'userId',
    description: 'ID of user that we want to find',
  })
  @ApiOkResponse({
    description: 'User is updated',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: Error,
  })
  @Patch('/:userId')
  public async editUser(
    @Body() createUserDto: CreateUserDTO,
    @Param('userId') userId: number,
  ): Promise<User> {
    return await this.userService.editUser(userId, createUserDto);
  }

  @ApiOperation({
    summary: 'Delete user with given ID',
  })
  @ApiParam({
    name: 'userId',
    description: 'ID of user that we want to find',
  })
  @ApiNoContentResponse({
    description: 'Successfully deleted',
  })
  @Delete('/:userId')
  @HttpCode(204)
  public async deleteProduct(@Param('userId') userId: number) {
    return await this.userService.deleteUser(userId);
  }
}
