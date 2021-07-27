import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Project } from './project.entity';
import { ProjectService } from './project.service';
import { CreateProjectDTO } from './dto/create-project.dto';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private projectService: ProjectService) {}

  @Mutation(() => Project)
  async createProject(@Args('input') input: CreateProjectDTO) {
    return this.projectService.createProject(input);
  }

  @Query(() => [Project])
  async getProjects() {
    return this.projectService.getProjects();
  }

  @Query(() => Project)
  async getProject(@Args('projectId') projectId: number) {
    return this.projectService.getProject(projectId);
  }

  @Query(() => [Project])
  async findProjectsWithUsersAll() {
    return this.projectService.findProjectsWithUsersAll();
  }

  @Mutation(() => Project)
  async editProject(
    @Args('projectId') projectId: number,
    @Args('input') input: CreateProjectDTO,
  ) {
    return this.projectService.editProject(projectId, input);
  }

  @Mutation(() => Project)
  async deleteUser(@Args('projectId') projectId: number) {
    return this.projectService.deleteProject(projectId);
  }
}
