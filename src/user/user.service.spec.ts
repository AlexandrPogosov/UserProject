import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import TestUtil from '../common/TestUtily';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  const mockUsersRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    createUser: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserRepository),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  beforeEach(() => {
    mockUsersRepository.find.mockReset();
    mockUsersRepository.findOne.mockReset();
    mockUsersRepository.createUser.mockReset();
    mockUsersRepository.save.mockReset();
    mockUsersRepository.update.mockReset();
    mockUsersRepository.delete.mockReset();
  });

  it('should be return user', async () => {
    expect(service).toBeDefined();
  });

  describe('findAllUsers', () => {
    it('should be list all Users', async () => {
      const user = TestUtil.giveMeValidUser();
      mockUsersRepository.find.mockReturnValue([user, user]);
      const users = await service.getUsers();
      expect(users).toHaveLength(2);
      expect(mockUsersRepository.find).toHaveBeenCalledTimes(1);
    });
  });
  describe('find User by Id', () => {
    it('should be User', async () => {
      const user = TestUtil.giveMeValidUser();
      mockUsersRepository.findOne.mockReturnValue(user);
      const userFound = await service.getUser(1);
      expect(userFound).toMatchObject({ first_name: 'Alexandr' });
      expect(mockUsersRepository.findOne).toHaveBeenCalledTimes(1);
    });
    it('should return a exception when does not to find a user', async () => {
      mockUsersRepository.findOne.mockReturnValue(null);
      await expect(service.getUser(3)).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(mockUsersRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });
  describe('create user', () => {
    it('should create a User', async () => {
      const user = TestUtil.giveMeValidUser();
      mockUsersRepository.save.mockReturnValue(user);
      mockUsersRepository.createUser.mockReturnValue(user);
      const savedUser = await service.createUser(user);
      expect(savedUser).toMatchObject(user);
      expect(mockUsersRepository.createUser).toHaveBeenCalledTimes(1);
      expect(mockUsersRepository.createUser).toBeCalledTimes(1);
    });
  });
});
