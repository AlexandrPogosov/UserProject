import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProjectRepository } from './userProject.repository';
import { CreateUserProjectDto } from './dto/create-userProject.dto';
import { UserProject } from './userProject.entity';
import {
  createQueryBuilder,
  getConnection,
  getConnectionManager,
  getRepository,
} from 'typeorm';
import { Project } from '../project/project.entity';
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

  public async findUserWithProjects(userId: number): Promise<unknown> {
    const res = await createQueryBuilder('User')
      .innerJoinAndSelect('User.userProjectEntity', 'UserProject')
      .innerJoinAndSelect('UserProject.project', 'project')
      .where(`User.id = ${userId}`)
      .getOne();
    console.log(res);
    return res;
    // const res = await this.userProjectRepository.find({
    //   where: {
    //     userId,
    //   },
    //   relations: ['user', 'project'],
    // });
    // if (res.length === 0) {
    //   throw new NotFoundException('User not found');
    // }
    // const projects = [];
    // const result = {
    //   last_name: res[0].user.last_name,
    //   first_name: res[0].user.first_name,
    //   age: res[0].user.age,
    //   date_birthday: res[0].user.date_birthday,
    //   skills: res[0].user.skills,
    //   technology: res[0].user.technology,
    //   projects: projects,
    // };
    //
    // for (let i = 0; i < res.length; i++) {
    //   projects.push({
    //     name: res[i].project.name,
    //     company_name: res[i].project.company_name,
    //     start: res[i].start_on_project,
    //     end: res[i].end_on_project,
    //   });
    // }
    // return result;
  }
  // Promise<{ company_name: string; name: string; users: any[] }>
  public async findProjectWithUsers(projectID: number) {
    // const res = await this.userProjectRepository.find({
    //   relations: ['project', 'user'],
    //   where: {
    //     projectId: projectID,
    //   },
    // });
    // // console.log(res);
    //

    // const res = await this.userProjectRepository
    //   .createQueryBuilder()
    //   .innerJoinAndMapOne(
    //     'UserProject.project',
    //     'project',
    //     'p',
    //   )
    //   .innerJoinAndMapMany(
    //     'UserProject.user',
    //     'user',
    //     'u',
    //     `UserProject.projectId=${projectID}`,
    //   )
    //   .where(`UserProject.projectId=${projectID}`)
    //   //.where(`UserProject.projectId = ${projectID}`)
    //   .getOne();
    console.log(projectID);
    // console.log(await getConnection()
    //   .createQueryBuilder()
    //   .relation(UserProject, 'project')
    //   .of(projectID)
    //   .loadMany()
    // )
    // const res = await this.userProjectRepository.manager.findOne(UserProject);
    // res.project = await getConnection()
    //   .createQueryBuilder()
    //   .relation(Project, 'userProjectEntity')
    //   .of(projectID)
    //   .loadOne();
    // res.user = await getConnection()
    //   .createQueryBuilder()
    //   .relation(UserProject, 'user')
    //   // .of(projectID)
    //   .loadMany();
    const res = await
      createQueryBuilder(Project)
      .for(projectID)
      .relation(Project, 'users')

      .loadMany();
    // const res = await createQueryBuilder('Project')
    //   .innerJoinAndSelect('Project.userProjectEntity', 'UserProject')
    //   .innerJoinAndSelect('UserProject.user', 'user')
    //   .where(`Project.id = ${projectID}`)
    //   .getOne();
    // const projectRepository = await getRepository(Project);
    // // @ts-ignore
    // const res = projectRepository.find({
    //   relations: ['userProjectEntity', 'userProjectEntity.user'],
    //   where: {
    //     id: projectID,
    //   },
    // });

    // const res = await getRepository(Project)
    //   .createQueryBuilder('Project')
    //   .leftJoinAndSelect('Project.userProjectEntity', 'UserProject')
    //   .leftJoinAndSelect('UserProject.user', 'user')
    //   .where(`Project.id = ${projectID}`)
    //   .getMany();
    console.log(res);
    // res.user = await getConnection()
    //   .createQueryBuilder()
    //   .relation(UserProject, 'user')
    //   .of(UserProject)
    //   .loadMany();
    // res.project = await getConnection()
    //   .createQueryBuilder()
    //   .relation(UserProject, 'project')
    //   .of(UserProject)
    //   .loadOne();
    // if (res.length === 0) {
    //   throw new NotFoundException('User not found');
    // }

    // const users = [];
    // const result = {
    //   name: res[0].project.name,
    //   company_name: res[0].project.company_name,
    //   users: users,
    // };
    // for (let i = 0; i < res.length; i++) {
    //   result.users.push({
    //     last_name: res[i].user.last_name,
    //     first_name: res[i].user.first_name,
    //     date_birthday: res[i].user.date_birthday,
    //     age: res[i].user.age,
    //     skills: res[i].user.skills,
    //     technology: res[i].user.technology,
    //   });
    // }
    return res;
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
