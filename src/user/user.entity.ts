import {
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { UserProject } from '../user-project/userProject.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  last_name: string;

  @Column()
  first_name: string;

  @Column()
  date_birthday: string;

  @Column()
  age: number;

  @Column()
  technology: string;

  @Column()
  skills: string;

  @OneToMany(() => UserProject, (userProjectEntity) => userProjectEntity.user)
  public userProjectEntity!: UserProject[];
}
