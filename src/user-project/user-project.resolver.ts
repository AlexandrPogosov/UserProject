import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserProject } from './userProject.entity';
import { UserProjectService } from './user-project.service';
import { CreateUserProjectDto } from './dto/create-userProject.dto';

@Resolver(() => UserProject)
export class UserProjectResolver {
  constructor(private userProjectService: UserProjectService) {}

  @Mutation(() => UserProject)
  async createUserProject(@Args('input') input: CreateUserProjectDto) {
    return this.userProjectService.createUserProject(input);
  }

  @Query(() => UserProject)
  async findUserWithProjects(@Args('userId') userId: number) {
    return this.userProjectService.findUserWithProjects(userId);
  }

  @Query(() => UserProject)
  async findProjectWithUsersByName(@Args('name') name: string) {
    return this.userProjectService.findProjectWithUsersByName(name);
  }

  @Query(() => UserProject)
  async findProjectWithUsers(@Args('projectId') projectId: number) {
    return this.userProjectService.findProjectWithUsers(projectId);
  }

  @Mutation(() => UserProject)
  async editUserProject(
    @Args('userId') userId: number,
    @Args('projectId') projectId: number,
    @Args('input') input: CreateUserProjectDto,
  ) {
    return this.userProjectService.editUserProject(userId, projectId, input);
  }

  @Mutation(() => UserProject)
  async deleteUserProject(
    @Args('userId') userId: number,
    @Args('projectId') projectId: number,
  ) {
    return this.userProjectService.deleteUserProject(userId, projectId);
  }
}
