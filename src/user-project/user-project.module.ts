import { Module } from '@nestjs/common';
import { UserProjectService } from './user-project.service';
import { UserProjectController } from './user-project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProjectRepository } from './userProject.repository';
import { UserProjectResolver } from './user-project.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserProjectRepository])],
  providers: [UserProjectService, UserProjectResolver],
  controllers: [UserProjectController],
})
export class UserProjectModule {}
