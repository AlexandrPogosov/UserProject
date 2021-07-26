import { Args, Mutation, Parent, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import { DeleteResult, getConnection } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Project } from '../project/project.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

const userRepository = new UserRepository();

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User!])
  async allUsers(): Promise<User[]> {
    const res = await this.userService.getUsers();
    console.log(res);
    return res;
  }

  @Query(() => User)
  async getUser(@Args('userId') userId: number): Promise<User> {
    return await this.userService.getUser(userId);
  }

  @Query(() => [User])
  async findUsersWithProjectsAll(): Promise<User[]> {
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
  @Mutation(() => User)
  async editUser(
    @Args('userId') userId: number,
    @Parent() createUserDto: CreateUserDTO,
  ): Promise<User> {
    const editedUser = await this.userService.getUser(userId);
    if (!editedUser) {
      throw new NotFoundException('Product not found');
    }
    return this.userService.editUser(editedUser.id, editedUser);
  }

  // @Query(() => DeleteResult)
  // public async deleteUser(
  //   @Args('userId') userId: number,
  // ): Promise<DeleteResult> {
  //   return await userRepository.delete(userId);
  // }
}
