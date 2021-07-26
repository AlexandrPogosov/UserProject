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
import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity()
export class UserProject extends BaseEntity {
  @Field(() => ID)
  @ApiProperty({
    type: Number,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @ApiProperty({
    type: Number,
  })
  @Column({ unique: false, select: false })
  userId: number;

  @Field(() => Int)
  @ApiProperty({
    type: Number,
  })
  @Column({ select: false })
  projectId: number;

  @Field()
  @ApiProperty({
    type: String,
  })
  @Column()
  start_on_project: string;

  @Field()
  @ApiProperty({
    type: String,
  })
  @Column({ nullable: true })
  end_on_project: string;

  @Field(() => [User!], {
    nullable: true,
  })
  @ManyToOne(() => User, (user) => user.userProjectEntity)
  public user!: any[];

  @Field(() => [Project!], {
    nullable: true,
  })
  @ManyToOne(() => Project, (project) => project.userProjectEntity)
  public project!: any[];
}
