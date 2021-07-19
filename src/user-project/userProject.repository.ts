import { EntityRepository, Repository } from 'typeorm';
import { UserProject } from './userProject.entity';
import { CreateUserProjectDto } from './dto/create-userProject.dto';

@EntityRepository(UserProject)
export class UserProjectRepository extends Repository<UserProject> {
  public async creatUserProject(
    createUserProjectDto: CreateUserProjectDto,
  ): Promise<UserProject> {
    const createUserProject = createUserProjectDto;

    const userProject = new UserProject();
    userProject.start_on_project = createUserProject.start_on_project;
    userProject.userId = createUserProject.userId;
    userProject.projectId = createUserProject.projectId;
    userProject.end_on_project = null;

    await userProject.save();
    return userProject;
  }

  public async editUserProject(
    createUserProjectDto: CreateUserProjectDto,
    editedUserProduct: UserProject,
  ): Promise<UserProject> {
    const createUserProject = createUserProjectDto;
    editedUserProduct.userId = createUserProject.userId;
    editedUserProduct.projectId = createUserProject.projectId;
    editedUserProduct.start_on_project = createUserProject.start_on_project;
    editedUserProduct.end_on_project = createUserProject.end_on_project;
    await editedUserProduct.save();
    return editedUserProduct;
  }
}
