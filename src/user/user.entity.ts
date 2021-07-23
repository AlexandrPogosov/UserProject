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

@Entity()
export class User extends BaseEntity {
  @ApiProperty({
    type: Number,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
  })
  @Column()
  last_name: string;

  @ApiProperty({
    type: String,
  })
  @Column()
  first_name: string;

  @ApiProperty({
    type: String,
  })
  @Column()
  date_birthday: string;

  @ApiProperty({
    type: Number,
  })
  @Column()
  age: number;

  @ApiProperty({
    type: String,
  })
  @Column()
  technology: string;

  @ApiProperty({
    type: String,
  })
  @Column()
  skills: string;

  @OneToMany(() => UserProject, (userProject) => userProject.project)
  public projects!: any[];

  @OneToMany(() => UserProject, (ud) => ud.user)
  @JoinTable({
    name: 'user_project',
    joinColumn: {
      name: 'id',
      referencedColumnName: 'user_project.userId',
    },
  })
  public userProjectEntity!: Array<UserProject>;
}
