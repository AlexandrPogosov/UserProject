import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { UserProject } from '../user-project/userProject.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Project extends BaseEntity {
  @ApiProperty({
    type: Number,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
  })
  @Column()
  name: string;

  @ApiProperty({
    type: String,
  })
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
