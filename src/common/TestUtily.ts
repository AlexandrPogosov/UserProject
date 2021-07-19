import { User } from '../user/user.entity';

export default class TestUtil {
  static giveMeValidUser(): User {
    const user = new User();
    user.first_name = 'Alexandr';
    user.last_name = 'Pogosov';
    user.age = 23;
    user.date_birthday = '22-12-1997';
    user.technology = 'NodeJS';
    user.skills = 'Back-End';
    user.id = 1;
    return user;
  }
}
