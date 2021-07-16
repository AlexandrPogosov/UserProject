import { Module } from '@nestjs/common';
import { UserProjectService } from './user-project.service';
import { UserProjectController } from './user-project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProjectRepository } from './userProject.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserProjectRepository])],
  providers: [UserProjectService],
  controllers: [UserProjectController],
})
export class UserProjectModule {}
