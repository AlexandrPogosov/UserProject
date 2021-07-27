import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserDTO): Promise<User> {
    return this.userService.createUser(input);
  }

  @Query(() => [User])
  async allUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Query(() => User)
  async getUser(@Args('userId') userId: number): Promise<User> {
    return this.userService.getUser(userId);
  }

  @Query(() => [User])
  async findUsersWithProjectsAll(): Promise<User[]> {
    return this.userService.findUsersWithProjectsAll();
  }
  @Mutation(() => User)
  async editUser(
    @Args('userId') userId: number,
    @Args('input') input: CreateUserDTO,
  ): Promise<User> {
    return this.userService.editUser(userId, input);
  }

  @Mutation(() => User)
  public async deleteUser(@Args('userId') userId: number) {
    return this.userService.deleteUser(userId);
  }
}
