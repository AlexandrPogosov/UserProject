import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { DeleteResult, getConnection } from 'typeorm';
import { Project } from '../project/project.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  public async createUser(createUserDto: CreateUserDTO): Promise<User> {
    console.log(createUserDto);
    return await this.userRepository.createUser(createUserDto);
  }

  public async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async getUser(userId: number): Promise<User> {
    const foundUser = await this.userRepository.findOne(userId);
    if (!foundUser) {
      throw new NotFoundException('Product not found');
    }
    return foundUser;
  }

  public async findUsersWithProjectsAll(): Promise<User[]> {
    const users = await getConnection()
      .createQueryBuilder()
      .from(User, 'users')
      .innerJoin('users.userProjectEntity', 'userProjects')
      .select('users')
      .getMany();
    if (!users) {
      throw new NotFoundException();
    }
    for (const user of users) {
      user.projects = await getConnection()
        .createQueryBuilder()
        .from(Project, 'projects')
        .innerJoin('projects.userProjectEntity', 'userProjects')
        .where(`userProjects.userId = ${user.id}`)
        .select('projects')
        .getMany();
    }
    return users;
  }

  public async editUser(
    userId: number,
    createUserDto: CreateUserDTO,
  ): Promise<User> {
    const editedUser = await this.userRepository.findOne(userId);
    if (!editedUser) {
      throw new NotFoundException('Product not found');
    }
    return this.userRepository.editUser(createUserDto, editedUser);
  }

  public async deleteUser(userId: number): Promise<DeleteResult> {
    return this.userRepository.delete(userId);
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    console.log(user);
    return user;
  }
}
