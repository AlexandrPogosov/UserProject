import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Project } from '../project/project.entity';

@Entity()
export class UserProject extends BaseEntity {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
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
