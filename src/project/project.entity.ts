import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { UserProject } from '../user-project/userProject.entity';

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  company_name: string;

  @OneToMany(
    () => UserProject,
    (userProjectEntity) => userProjectEntity.project,
  )
  public userProjectEntity!: UserProject[];
}
