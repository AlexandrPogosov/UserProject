import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserProjectService } from './user-project.service';
import { CreateUserProjectDto } from './dto/create-userProject.dto';
import { UserProject } from './userProject.entity';

@Controller('user-project')
export class UserProjectController {
  constructor(private userProjectService: UserProjectService) {}

  @Post('')
  public async createUserProject(
    @Body() createUserProjectDto: CreateUserProjectDto,
  ): Promise<UserProject> {
    return await this.userProjectService.createUserProject(
      createUserProjectDto,
    );
  }

  @Get('/:userId')
  public async getUsersWithProjects(@Param('userId') userId: number): Promise<unknown> {
    return await this.userProjectService.findUserWithProjects(userId);
  }
  // Promise<{ company_name: string; name: string; users: any[] }>
  @Get('/project/:projectId')
  public async getProjectWithUsers(@Param('projectId') projectId: number) {
    return this.userProjectService.findProjectWithUsers(projectId);
    //return await this.userProjectService.findProjectWithUsers(projectId);
  }

  @Patch('/:userId/:projectId')
  public async editUserProject(
    @Body() createUserProjectDto: CreateUserProjectDto,
    @Param('userId') userId: number,
    @Param('projectId') projectId: number,
  ): Promise<UserProject> {
    return await this.userProjectService.editUserProject(
      userId,
      projectId,
      createUserProjectDto,
    );
  }

  @Delete('/:userId/:projectId')
  @HttpCode(204)
  public async deleteUserProject(
    @Param('userId') userId: number,
    @Param('projectId') projectId: number,
  ): Promise<void> {
    return await this.userProjectService.deleteUserProject(userId, projectId);
  }
}
