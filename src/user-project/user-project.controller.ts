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
  Req,
} from '@nestjs/common';
import { UserProjectService } from './user-project.service';
import { CreateUserProjectDto } from './dto/create-userProject.dto';
import { UserProject } from './userProject.entity';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserProjectsDto } from './dto/user-projects.dto';
import { ProjectUsersDto } from './dto/project-users.dto';

@ApiTags('UsersProjects')
@Controller('user-project')
export class UserProjectController {
  constructor(private userProjectService: UserProjectService) {}

  @ApiOperation({
    summary: 'Create a new UserProject',
  })
  @ApiBody({
    description: 'UserProject that we want to create',
    type: CreateUserProjectDto,
  })
  @ApiCreatedResponse({
    description: 'The userProject has been successfully created.',
    type: UserProject,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
    type: Error,
  })
  @Post('')
  @Header('Content-Type', 'application/json; charset=UTF-8')
  public async createUserProject(
    @Body() createUserProjectDto: CreateUserProjectDto,
  ): Promise<UserProject> {
    return await this.userProjectService.createUserProject(
      createUserProjectDto,
    );
  }

  @ApiOperation({
    summary: 'Get user with projects in system',
  })
  @ApiParam({
    name: 'userId',
    description: 'ID of user that we want to find',
  })
  @ApiOkResponse({
    description: 'Here is userProject which you want to find',
    type: UserProjectsDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: Error,
  })
  @Get('/:userId')
  @Header('Cache-Control', 'no-store, no-cache, must-revalidate')
  @Header('Content-Type', 'application/json; charset=UTF-8')
  public async getUsersWithProjects(@Param('userId') userId: number) {
    return await this.userProjectService.findUserWithProjects(userId);
  }

  @ApiOperation({
    summary: 'Get project with users in system',
  })
  @ApiParam({
    name: 'name',
    description: 'Name of project that we want to find',
  })
  @ApiOkResponse({
    description: 'Here is userProject which you want to find',
    type: ProjectUsersDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: Error,
  })
  @Get('/findByProjectName/:name')
  public async getUsersWithProjectsByName(@Param('name') name: string) {
    return await this.userProjectService.findProjectWithUsersByName(name);
  }

  @ApiOperation({
    summary: 'Get project with users in system',
  })
  @ApiParam({
    name: 'projectId',
    description: 'ID of project that we want to find',
  })
  @ApiOkResponse({
    description: 'Here is userProject which you want to find',
    type: ProjectUsersDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: Error,
  })
  @Get('/project/:projectId')
  @Header('Cache-Control', 'no-store, no-cache, must-revalidate')
  @Header('Content-Type', 'application/json; charset=UTF-8')
  public async getProjectWithUsers(@Param('projectId') projectId: number) {
    return this.userProjectService.findProjectWithUsers(projectId);
  }

  @ApiOperation({
    summary: 'Update userProject with give ID',
  })
  @ApiBody({
    description: 'UserProject that we want to update',
    type: CreateUserProjectDto,
  })
  @ApiParam({
    name: 'userId',
    description: 'ID of user that we want to find',
  })
  @ApiParam({
    name: 'projectId',
    description: 'ID of project that we want to find',
  })
  @ApiOkResponse({
    description: 'UserProject is updated',
    type: UserProject,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: Error,
  })
  @Patch('/:userId/:projectId')
  public async editUserProject(
    @Body() createUserProjectDto: CreateUserProjectDto,
    @Param('userId') userId: number,
    @Param('projectId') projectId: number,
  ): Promise<UserProject> {
    return await this.userProjectService.editUserProject(
      userId,
      projectId,
      createUserProjectDto,
    );
  }

  @ApiOperation({
    summary: 'Delete userProject with given ID',
  })
  @ApiParam({
    name: 'userId',
    description: 'ID of user that we want to find',
  })
  @ApiParam({
    name: 'projectId',
    description: 'ID of project that we want to find',
  })
  @ApiNoContentResponse({
    description: 'Successfully deleted',
  })
  @Delete('/:userId/:projectId')
  @HttpCode(204)
  public async deleteUserProject(
    @Param('userId') userId: number,
    @Param('projectId') projectId: number,
  ): Promise<void> {
    return await this.userProjectService.deleteUserProject(userId, projectId);
  }
}
