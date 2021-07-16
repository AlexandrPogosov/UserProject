import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProjectRepository } from './userProject.repository';
import { CreateUserProjectDto } from './dto/create-userProject.dto';
import { UserProject } from './userProject.entity';

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

  public async findUser(): Promise<UserProject> {
    return await this.userProjectRepository.findOne({
      relations: ['user', 'project'],
    });
  }
}
