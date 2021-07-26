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
  last_name: string;

  @Field()
  @ApiProperty({
    type: String,
  })
  @Column()
  first_name: string;

  @Field()
  @ApiProperty({
    type: String,
  })
  @Column()
  date_birthday: string;

  @Field(() => Int)
  @ApiProperty({
    type: Number,
  })
  @Column()
  age: number;

  @Field()
  @ApiProperty({
    type: String,
  })
  @Column()
  technology: string;

  @Field()
  @ApiProperty({
    type: String,
  })
  @Column()
  skills: string;

  @Field(() => [Project], {
    nullable: true,
  })
  @OneToMany(() => UserProject, (userProject) => userProject.project)
  public projects: Project[];

  @Field((type) => [UserProject], {
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
