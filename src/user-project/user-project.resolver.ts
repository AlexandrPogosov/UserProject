import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserProject } from './userProject.entity';
import { UserProjectService } from './user-project.service';

@Resolver(() => UserProject)
export class UserProjectResolver {
  constructor(private userProjectService: UserProjectService) {}
}
