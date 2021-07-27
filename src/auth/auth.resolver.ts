import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../user/user.entity';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private authService: AuthService) {}

  @Mutation()
  async login(@Args('input') input: CreateUserDTO): Promise<{ token: string }> {
    return this.authService.login(input);
  }

  @Mutation()
  public async registration(@Args('input') input: CreateUserDTO) {
    return this.authService.registration(input);
  }
}
