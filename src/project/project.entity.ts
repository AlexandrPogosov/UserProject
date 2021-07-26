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
import { ApiProperty } from '@nestjs/swagger';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Project extends BaseEntity {
  @Field(() => ID)
  @ApiProperty({
    type: Number,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @ApiProperty({
    type: String,
  })
  @Column()
  name: string;

  @Field()
  @ApiProperty({
    type: String,
  })
  @Column()
  company_name: string;

  @Field(() => [User!], {
    nullable: true,
  })
  @OneToMany(() => UserProject, (userProject) => userProject.user)
  public users!: any[];

  @Field(() => [UserProject!], {
    nullable: true,
  })
  @OneToMany(() => UserProject, (userProject) => userProject.project)
  @JoinTable({
    name: 'user_project',
    joinColumn: {
      name: 'id',
      referencedColumnName: 'user_project.projectId',
    },
  })
  public userProjectEntity!: UserProject[];
}
