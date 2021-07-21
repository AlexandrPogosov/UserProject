import { User } from '../user/user.entity';
import { Project } from '../project/project.entity';
import { UserProject } from '../user-project/userProject.entity';

export default class TestUtil {
  static giveMeValidUser(): User {
    const user = new User();
    user.first_name = 'Alexandr';
    user.last_name = 'Pogosov';
    user.age = 23;
    user.date_birthday = '22-12-1997';
    user.technology = 'NodeJS';
    user.skills = 'Back-End';
    user.id = 1;
    return user;
  }

  static giveMeValidProject(): Project {
    const project = new Project();
    project.name = 'Project';
    project.company_name = 'Facebook';
    project.id = 1;
    return project;
  }

  static giveMeValidUserProject(): UserProject {
    const userProject = new UserProject();
    userProject.userId = 1;
    userProject.projectId = 1;
    userProject.start_on_project = '12-12-2000';
    userProject.end_on_project = null;
    return userProject;
  }
}
