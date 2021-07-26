import { Args, Query, Resolver } from '@nestjs/graphql';
import { Project } from './project.entity';
import { ProjectService } from './project.service';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private projectService: ProjectService) {}
}
