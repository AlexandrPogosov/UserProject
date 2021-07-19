import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async createUser(createUserDto: CreateUserDTO): Promise<User> {
    const createUser = createUserDto;
    const user = new User();
    user.first_name = createUser.first_name;
    user.last_name = createUser.last_name;
    user.date_birthday = createUser.date_birthday;
    user.age = createUser.age;
    user.technology = createUser.technology;
    user.skills = createUser.skills;
    await user.save();
    console.log(user);
    return user;
  }

  public async editUser(
    createUserDto: CreateUserDTO,
    editedProduct: User,
  ): Promise<User> {
    const createUser = createUserDto;
    editedProduct.first_name = createUser.first_name;
    editedProduct.last_name = createUser.last_name;
    editedProduct.date_birthday = createUser.date_birthday;
    editedProduct.age = createUser.age;
    editedProduct.technology = createUser.technology;
    editedProduct.skills = createUser.skills;
    await editedProduct.save();
    return editedProduct;
  }
}
