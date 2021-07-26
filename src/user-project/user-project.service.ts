import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProjectRepository } from './userProject.repository';
import { CreateUserProjectDto } from './dto/create-userProject.dto';
import { UserProject } from './userProject.entity';
import { Project } from '../project/project.entity';
import { getConnection } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class UserProjectService {
  constructor(
    @InjectRepository(UserProjectRepository)
    private userProjectRepository: UserProjectRepository,
  ) {}

  public async createUserProject(
    createUserProjectDto: CreateUserProjectDto,
  ): Promise<UserProject> {
    return await this.userProjectRepository.creatUserProject(
      createUserProjectDto,
    );
  }

  public async findUserWithProjects(userId: number) {
    const user = await getConnection()
      .createQueryBuilder()
      .from(User, 'users')
      .innerJoin('users.userProjectEntity', 'userProjects')
      .where('userProjects.userId = :userId', { userId })
      .select('users')
      .getOne();
    if (!user) {
      throw new NotFoundException();
    }

    user.projects = await getConnection()
      .createQueryBuilder()
      .from(Project, 'projects')
      .innerJoin('projects.userProjectEntity', 'userProjects')
      .where('userProjects.userId = :userId', { userId })
      .select('projects')
      .getMany();
    return user;
  }

  public async findProjectWithUsersByName(name: string) {
    const project = await getConnection()
      .createQueryBuilder()
      .from(Project, 'projects')
      .innerJoin('projects.userProjectEntity', 'userProjects')
      .where('projects.name = :name', { name })
      .select('projects')
      .getOne();
    if (!project) {
      throw new NotFoundException();
    }

    project.users = await getConnection()
      .createQueryBuilder()
      .from(User, 'users')
      .innerJoin('users.userProjectEntity', 'userProjects')
      .where(`userProjects.projectId = ${project.id}`)
      .select('users')
      .getMany();
    return project;
  }

  public async findProjectWithUsers(projectID: number) {
    const project = await getConnection()
      .createQueryBuilder()
      .from(Project, 'projects')
      .innerJoin('projects.userProjectEntity', 'userProjects')
      .where('userProjects.projectId = :projectID', { projectID })
      .select('projects')
      .getOne();
    if (!project) {
      throw new NotFoundException();
    }

    project.users = await getConnection()
      .createQueryBuilder()
      .from(User, 'users')
      .innerJoin('users.userProjectEntity', 'userProjects')
      .where('userProjects.projectId = :projectID', { projectID })
      .select('users')
      .getMany();
    return project;
  }

  public async editUserProject(
    userId: number,
    projectId: number,
    createUserProjectDto: CreateUserProjectDto,
  ): Promise<UserProject> {
    const editedUserProject = await this.userProjectRepository.findOne({
      where: {
        userId: userId,
        projectId: projectId,
      },
    });
    if (!editedUserProject) {
      throw new NotFoundException('User not found');
    }
    return this.userProjectRepository.editUserProject(
      createUserProjectDto,
      editedUserProject,
    );
  }

  public async deleteUserProject(
    userId: number,
    projectId: number,
  ): Promise<void> {
    await this.userProjectRepository.delete({
      userId: userId,
      projectId: projectId,
    });
  }
}
