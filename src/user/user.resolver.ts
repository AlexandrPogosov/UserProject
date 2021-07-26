import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User!])
  async allUsers(): Promise<User[]> {
    const res = await this.userService.getUsers();
    console.log(res);
    return res;
  }
  //
  // @Query(() => User)
  // async customer(@Args('userId') userId: number): Promise<User> {
  //   return await this.userService.getUser(userId);
  // }
}
