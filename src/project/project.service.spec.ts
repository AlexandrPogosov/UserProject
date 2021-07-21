import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProjectRepository } from './project.repository';
import TestUtil from '../common/TestUtily';
import { NotFoundException } from '@nestjs/common';

describe('ProjectService', () => {
  let service: ProjectService;
  const mockProjectRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    createProject: jest.fn(),
    save: jest.fn(),
    editProject: jest.fn(),
    deleteUser: jest.fn(),
    delete: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: getRepositoryToken(ProjectRepository),
          useValue: mockProjectRepository,
        },
      ],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
  });

  beforeEach(() => {
    mockProjectRepository.find.mockReset();
    mockProjectRepository.findOne.mockReset();
    mockProjectRepository.createProject.mockReset();
    mockProjectRepository.save.mockReset();
    mockProjectRepository.editProject.mockReset();
    mockProjectRepository.deleteUser.mockReset();
    mockProjectRepository.delete.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When find all Project', () => {
    it('should be return list all Projects', async () => {
      const project = TestUtil.giveMeValidProject();
      mockProjectRepository.find.mockReturnValue([project, project]);
      const projects = await service.getProjects();
      expect(projects).toHaveLength(2);
      expect(mockProjectRepository.find).toHaveBeenCalledTimes(1);
    });
  });
  describe('When find Project by Id', () => {
    it('should be return Project', async () => {
      const project = TestUtil.giveMeValidProject();
      mockProjectRepository.findOne.mockReturnValue(project);
      const projectFound = await service.getProject(project.id);
      expect(projectFound).toMatchObject({ name: 'Project' });
      expect(mockProjectRepository.findOne).toHaveBeenCalledTimes(1);
    });
    it('should return a exception when does not to find a project', async () => {
      mockProjectRepository.findOne.mockReturnValue(null);
      await expect(service.getProject(3)).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(mockProjectRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });
  describe('When create Project', () => {
    it('should create a Project', async () => {
      const project = TestUtil.giveMeValidProject();
      mockProjectRepository.save.mockReturnValue(project);
      mockProjectRepository.createProject.mockReturnValue(project);
      const savedUser = await service.createProject(project);
      expect(savedUser).toMatchObject(project);
      expect(mockProjectRepository.createProject).toHaveBeenCalledTimes(1);
      expect(mockProjectRepository.createProject).toBeCalledTimes(1);
    });
  });
  describe('When update user', () => {
    it('should update a User', async () => {
      const project = TestUtil.giveMeValidProject();
      const updateProject = {
        name: 'Project2',
        company_name: 'Facebook',
        id: 1,
      };
      mockProjectRepository.findOne.mockReturnValue(project);
      const updateU = await service.getProject(1);
      mockProjectRepository.editProject.mockReturnValue({
        ...project,
        ...updateProject,
      });
      const resUser = await service.editProject(updateU.id, updateProject);
      expect(resUser).toMatchObject(updateProject);
      expect(mockProjectRepository.findOne).toBeCalledTimes(2);
      expect(mockProjectRepository.editProject).toBeCalledTimes(1);
    });
  });
  describe('When delete Project', () => {
    it('should delete a Project', async () => {
      const project = TestUtil.giveMeValidProject();
      mockProjectRepository.findOne.mockReturnValue(project);
      await service.getProject(1);
      mockProjectRepository.delete.mockReturnValue(project);
      await service.deleteProject(1);
      expect(mockProjectRepository.delete).toBeCalledTimes(1);
    });
  });
});
