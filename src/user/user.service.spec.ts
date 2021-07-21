import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { createConnection, Repository } from 'typeorm';
import { Project } from '../project/project.entity';
import { UserProject } from '../user-project/userProject.entity';

describe('ProductService', () => {
  let userService;

  beforeAll(async () => {
    await createConnection({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [User, Project, UserProject],
      synchronize: true,
      logging: false,
    });
  });

  it('create User', async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useClass: UserRepository,
        },
      ],
    }).compile();
    userService = module.get<UserService>(UserService);

    const user = new User();
    user.first_name = 'Alexandr';
    user.last_name = 'Pogosov';
    user.age = 23;
    user.date_birthday = '22-12-1997';
    user.technology = 'NodeJS';
    user.skills = 'Back-End';
    const createdUser = await userService.createUser(user);
    expect(createdUser).toMatchObject(user);
  });

  it('return list all Users', async () => {
    const mockUserRepository = () => ({
      find: jest.fn(),
    });

    const module: TestingModule = await Test.createTestingModule({
      imports: [Repository],
      providers: [
        UserService,
        {
          provide: UserRepository,
          useFactory: mockUserRepository,
        },
      ],
    }).compile();
    userService = module.get<UserService>(UserService);

    const listUser = await userService.getUsers();
    expect(listUser).toBeUndefined();
  });
});
// import { UserRepository } from './user.repository';
// import { UserService } from './user.service';
// import { createConnection, Repository } from 'typeorm';
// import { Project } from '../project/project.entity';
// import { UserProject } from '../user-project/userProject.entity';
// import { User } from './user.entity';
//
// describe('UserService', () => {
//   let userService: UserService;
//   let userRepository: UserRepository;
//
//   beforeAll(async () => {
//     await createConnection({
//       type: 'sqlite',
//       database: ':memory:',
//       dropSchema: true,
//       entities: [User, Project, UserProject],
//       synchronize: true,
//       logging: false,
//     });
//   });
//
//   beforeEach(() => {
//     userRepository = new UserRepository();
//     userService = new UserService(userRepository);
//   });
//
//   describe('findAll', () => {
//     it('should return an array of cats', async () => {
//       const allUsers = await userService.getUsers();
//       console.log(allUsers);
//     });
//   });
// });
