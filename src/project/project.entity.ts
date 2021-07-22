import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { UserProject } from '../user-project/userProject.entity';
import { User } from '../user/user.entity';

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  company_name: string;

  @OneToMany(() => UserProject, (userProject) => userProject.user)
  public users!: any[];

  @OneToMany(() => UserProject, (userProject) => userProject.project)
  @JoinTable({
    name: 'user_project',
    joinColumn: {
      name: 'id',
      referencedColumnName: 'user_project.projectId',
    },
  })
  public userProjectEntity!: Array<UserProject>;
}
