import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { CreateProjectDTO } from './dto/create-project.dto';
import { ProjectRepository } from './project.repository';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectRepository)
    private projectRepository: ProjectRepository,
  ) {}

  public async createProject(
    createProjectDto: CreateProjectDTO,
  ): Promise<Project> {
    return await this.projectRepository.createProject(createProjectDto);
  }

  public async getProjects(): Promise<Project[]> {
    return await this.projectRepository.find();
  }

  public async getProject(projectId: number): Promise<Project> {
    const foundProject = await this.projectRepository.findOne(projectId);
    if (!foundProject) {
      throw new NotFoundException('Project not found');
    }
    return foundProject;
  }

  public async editProject(
    projectId: number,
    createProjectDto: CreateProjectDTO,
  ): Promise<Project> {
    const editedProject = await this.projectRepository.findOne(projectId);
    if (!editedProject) {
      throw new NotFoundException('Project not found');
    }
    return this.projectRepository.editProject(createProjectDto, editedProject);
  }

  public async deleteProject(projectId: number): Promise<void> {
    await this.projectRepository.delete(projectId);
  }
}
