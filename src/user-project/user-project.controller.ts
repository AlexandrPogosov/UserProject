import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserProjectService } from './user-project.service';
import { CreateUserProjectDto } from './dto/create-userProject.dto';
import { UserProject } from './userProject.entity';

@Controller('user-project')
export class UserProjectController {
  constructor(private userProjectService: UserProjectService) {}

  @Post('create')
  public async createUserProject(
    @Body() createUserProjectDto: CreateUserProjectDto,
  ): Promise<UserProject> {
    return await this.userProjectService.createUserProject(
      createUserProjectDto,
    );
  }

  @Get('all')
  public async getUsers(): Promise<UserProject> {
    return await this.userProjectService.findUser();
  }
}
