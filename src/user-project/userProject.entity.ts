import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Project } from '../project/project.entity';

@Entity()
export class UserProject extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: false, select: false })
  userId: number;

  @Column()
  projectId: number;

  @Column()
  start_on_project: string;

  @Column({ nullable: true })
  end_on_project: string;

  @ManyToOne(() => User, (user) => user.userProjectEntity)
  public user!: any[];

  @ManyToOne(() => Project, (project) => project.userProjectEntity)
  public project!: any[];
}
