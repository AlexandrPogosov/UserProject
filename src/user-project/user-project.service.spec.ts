import { Test, TestingModule } from '@nestjs/testing';
import { UserProjectService } from './user-project.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserProjectRepository } from './userProject.repository';
import TestUtil from '../common/TestUtily';

describe('UserProjectService', () => {
  let service: UserProjectService;
  const mockUserProjectRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    creatUserProject: jest.fn(),
    findUserWithProjects: jest.fn(),
    findProjectWithUsers: jest.fn(),
    save: jest.fn(),
    editUserProject: jest.fn(),
    deleteUserProject: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserProjectService,
        {
          provide: getRepositoryToken(UserProjectRepository),
          useValue: mockUserProjectRepository,
        },
      ],
    }).compile();

    service = module.get<UserProjectService>(UserProjectService);
  });

  beforeEach(() => {
    mockUserProjectRepository.find.mockReset();
    mockUserProjectRepository.findOne.mockReset();
    mockUserProjectRepository.creatUserProject.mockReset();
    mockUserProjectRepository.save.mockReset();
    mockUserProjectRepository.findProjectWithUsers.mockReset();
    mockUserProjectRepository.findUserWithProjects.mockReset();
    mockUserProjectRepository.editUserProject.mockReset();
    mockUserProjectRepository.deleteUserProject.mockReset();
    mockUserProjectRepository.delete.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When create userProject', () => {
    it('should create a UserProject', async () => {
      const userProject = TestUtil.giveMeValidUserProject();
      mockUserProjectRepository.save.mockReturnValue(userProject);
      mockUserProjectRepository.creatUserProject.mockReturnValue(userProject);
      const savedUserProject = await service.createUserProject(userProject);
      expect(savedUserProject).toMatchObject(userProject);
      expect(mockUserProjectRepository.creatUserProject).toHaveBeenCalledTimes(
        1,
      );
      expect(mockUserProjectRepository.creatUserProject).toBeCalledTimes(1);
    });
  });
  describe('When update userProject', () => {
    it('should update a UserProject', async () => {
      const userProject = TestUtil.giveMeValidUserProject();
      const updateUserProject = {
        userId: 1,
        projectId: 1,
        start_on_project: '12-12-2000',
        end_on_project: '13-12-2000',
      };
      mockUserProjectRepository.findOne.mockReturnValue(userProject);
      mockUserProjectRepository.editUserProject.mockReturnValue({
        ...userProject,
        ...updateUserProject,
      });
      const resUser = await service.editUserProject(
        userProject.userId,
        userProject.projectId,
        updateUserProject,
      );
      expect(resUser).toMatchObject(updateUserProject);
      expect(mockUserProjectRepository.findOne).toBeCalledTimes(1);
      expect(mockUserProjectRepository.editUserProject).toBeCalledTimes(1);
    });
  });
  describe('When delete UserProject', () => {
    it('should delete a UserProject', async () => {
      const userProject = TestUtil.giveMeValidUserProject();
      mockUserProjectRepository.delete.mockReturnValue(userProject);
      await service.deleteUserProject(
        userProject.userId,
        userProject.projectId,
      );
      expect(mockUserProjectRepository.delete).toBeCalledTimes(1);
    });
  });
});
