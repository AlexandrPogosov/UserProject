import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDTO } from './dto/create-project.dto';
import { Project } from './project.entity';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post('')
  public async createProject(
    @Body() createProjectDto: CreateProjectDTO,
  ): Promise<Project> {
    return this.projectService.createProject(createProjectDto);
  }

  @Get('')
  public async getProjects(): Promise<Project[]> {
    return this.projectService.getProjects();
  }

  @Get('/:projectId')
  public async getProject(@Param('projectId') projectId: number) {
    return await this.projectService.getProject(projectId);
  }

  @Patch('/:projectId')
  public async editProject(
    @Body() createProjectDto: CreateProjectDTO,
    @Param('projectID') projectId: number,
  ): Promise<Project> {
    return await this.projectService.editProject(projectId, createProjectDto);
  }

  @Delete('/:projectId')
  public async deleteProject(@Param('projectId') projectId: number) {
    return await this.projectService.deleteProject(projectId);
  }
}
