import {
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { UserProject } from '../user-project/userProject.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Project } from '../project/project.entity';

@ObjectType()
@Entity()
export class User extends BaseEntity {
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
  email: string;

  @Field()
  @ApiProperty({
    type: String,
  })
  @Column()
  password: string;

  @Field()
  @ApiProperty({
    type: String,
  })
  @Column({ nullable: true })
  last_name: string;

  @Field()
  @ApiProperty({
    type: String,
  })
  @Column({ nullable: true })
  first_name: string;

  @Field()
  @ApiProperty({
    type: String,
  })
  @Column({ nullable: true })
  date_birthday: string;

  @Field(() => Int)
  @ApiProperty({
    type: Number,
  })
  @Column({ nullable: true })
  age: number;

  @Field()
  @ApiProperty({
    type: String,
  })
  @Column({ nullable: true })
  technology: string;

  @Field()
  @ApiProperty({
    type: String,
  })
  @Column({ nullable: true })
  skills: string;

  @Field(() => [Project], {
    nullable: true,
  })
  @OneToMany(() => UserProject, (userProject) => userProject.project)
  public projects: Project[];

  @Field(() => [UserProject], {
    nullable: true,
  })
  @OneToMany(() => UserProject, (ud) => ud.user)
  @JoinTable({
    name: 'user_project',
    joinColumn: {
      name: 'id',
      referencedColumnName: 'user_project.userId',
    },
  })
  public userProjectEntity: UserProject[];
}
