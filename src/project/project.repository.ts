import { Repository, EntityRepository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectDTO } from './dto/create-project.dto';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  public async createProject(
    createProjectDto: CreateProjectDTO,
  ): Promise<Project> {
    const createProject = createProjectDto;

    const project = new Project();
    project.name = createProject.name;
    project.company_name = createProject.company_name;

    await project.save();

    return project;
  }

  public async editProject(
    createProjectDto: CreateProjectDTO,
    editProject: Project,
  ): Promise<Project> {
    const createProject = createProjectDto;

    editProject.name = createProject.name;
    editProject.company_name = createProject.company_name;

    await editProject.save();

    return editProject;
  }
}
