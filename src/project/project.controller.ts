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
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDTO } from './dto/create-project.dto';
import { Project } from './project.entity';
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
import { ProjectUsersDto } from '../user-project/dto/project-users.dto';

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @ApiOperation({
    summary: 'Create a new Project',
  })
  @ApiBody({
    description: 'Project that we want to create',
    type: CreateProjectDTO,
  })
  @ApiCreatedResponse({
    description: 'The project has been successfully created.',
    type: Project,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
    type: Error,
  })
  @Post('')
  @Header('Content-Type', 'application/json; charset=UTF-8')
  public async createProject(
    @Body() createProjectDto: CreateProjectDTO,
  ): Promise<Project> {
    return this.projectService.createProject(createProjectDto);
  }

  @ApiOperation({
    summary: 'Get all projects in system',
  })
  @ApiOkResponse({
    type: Project,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: Error,
  })
  @Get('')
  @Header('Cache-Control', 'no-store, no-cache, must-revalidate')
  @Header('Content-Type', 'application/json; charset=UTF-8')
  public async getProjects(): Promise<Project[]> {
    return this.projectService.getProjects();
  }

  @ApiOperation({
    summary: 'Get all projects with users in system',
  })
  @ApiOkResponse({
    type: ProjectUsersDto,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: Error,
  })
  @Get('/users')
  @Header('Cache-Control', 'no-store, no-cache, must-revalidate')
  @Header('Content-Type', 'application/json; charset=UTF-8')
  public async getProjectsWithUsers() {
    return this.projectService.findProjectsWithUsersAll();
  }

  @ApiOperation({
    summary: 'Get project in system',
  })
  @ApiParam({
    name: 'projectId',
    description: 'ID of project that we want to find',
  })
  @ApiOkResponse({
    description: 'Here is project which you want to find',
    type: Project,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: Error,
  })
  @Get('/:projectId')
  @Header('Cache-Control', 'no-store, no-cache, must-revalidate')
  @Header('Content-Type', 'application/json; charset=UTF-8')
  public async getProject(@Param('projectId') projectId: number) {
    return await this.projectService.getProject(projectId);
  }

  @ApiOperation({
    summary: 'Update project with give ID',
  })
  @ApiParam({
    name: 'projectID',
    description: 'ID of project that we want to find',
  })
  @ApiOkResponse({
    description: 'Project is updated',
    type: Project,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: Error,
  })
  @Patch('/:projectId')
  public async editProject(
    @Body() createProjectDto: CreateProjectDTO,
    @Param('projectID') projectId: number,
  ): Promise<Project> {
    return await this.projectService.editProject(projectId, createProjectDto);
  }

  @ApiOperation({
    summary: 'Delete project with given ID',
  })
  @ApiParam({
    name: 'projectId',
    description: 'ID of project that we want to find',
  })
  @ApiNoContentResponse({
    description: 'Successfully deleted',
  })
  @Delete('/:projectId')
  @HttpCode(204)
  public async deleteProject(@Param('projectId') projectId: number) {
    return await this.projectService.deleteProject(projectId);
  }
}
