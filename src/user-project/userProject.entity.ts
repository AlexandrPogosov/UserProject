import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Project } from '../project/project.entity';
import { JoinTable } from 'typeorm/browser';

@Entity()
export class UserProject extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: false })
  userId: number;

  @Column()
  projectId: number;

  @Column()
  start_on_project: string;

  @Column({ nullable: true })
  end_on_project: string;

  @ManyToOne(() => User, (user) => user.userProjectEntity)
  public user!: User;

  @ManyToOne(() => Project, (project) => project.userProjectEntity)
  public project!: Project;
}
