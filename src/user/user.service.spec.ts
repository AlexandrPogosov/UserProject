import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import TestUtil from '../common/TestUtily';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  const mockUsersRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    createUser: jest.fn(),
    save: jest.fn(),
    editUser: jest.fn(),
    deleteUser: jest.fn(),
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
    mockUsersRepository.editUser.mockReset();
    mockUsersRepository.deleteUser.mockReset();
    mockUsersRepository.delete.mockReset();
  });

  it('should be return user', async () => {
    expect(service).toBeDefined();
  });

  describe('When find all Users', () => {
    it('should be list all Users', async () => {
      const user = TestUtil.giveMeValidUser();
      mockUsersRepository.find.mockReturnValue([user, user]);
      const users = await service.getUsers();
      expect(users).toHaveLength(2);
      expect(mockUsersRepository.find).toHaveBeenCalledTimes(1);
    });
  });
  describe('When find User by Id', () => {
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
  describe('When create user', () => {
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
  describe('When update user', () => {
    it('should update a User', async () => {
      const user = TestUtil.giveMeValidUser();
      const updateUser = {
        email: 'ivan@gmail.com',
        password: '123',
        first_name: 'Ivan',
        last_name: 'Pogosov',
        age: 23,
        date_birthday: '22-12-1997',
        technology: 'NodeJS',
        skills: 'Back-End',
        id: 1,
      };
      mockUsersRepository.findOne.mockReturnValue(user);
      const updateU = await service.getUser(1);
      mockUsersRepository.editUser.mockReturnValue({
        ...user,
        ...updateUser,
      });
      const resUser = await service.editUser(updateU.id, updateUser);
      expect(resUser).toMatchObject(updateUser);
      expect(mockUsersRepository.findOne).toBeCalledTimes(2);
      expect(mockUsersRepository.editUser).toBeCalledTimes(1);
    });
  });
  describe('When delete user', () => {
    it('should delete a User', async () => {
      const user = TestUtil.giveMeValidUser();
      mockUsersRepository.findOne.mockReturnValue(user);
      await service.getUser(1);
      mockUsersRepository.delete.mockReturnValue(user);
      await service.deleteUser(1);
      expect(mockUsersRepository.delete).toBeCalledTimes(1);
    });
  });
});
