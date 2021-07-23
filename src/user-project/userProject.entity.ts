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
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class UserProject extends BaseEntity {
  @ApiProperty({
    type: Number,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: Number,
  })
  @Column({ unique: false, select: false })
  userId: number;

  @ApiProperty({
    type: Number,
  })
  @Column({ select: false })
  projectId: number;

  @ApiProperty({
    type: String,
  })
  @Column()
  start_on_project: string;

  @ApiProperty({
    type: String,
  })
  @Column({ nullable: true })
  end_on_project: string;

  @ManyToOne(() => User, (user) => user.userProjectEntity)
  public user!: any[];

  @ManyToOne(() => Project, (project) => project.userProjectEntity)
  public project!: any[];
}
