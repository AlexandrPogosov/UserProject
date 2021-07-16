import { IsNumber, IsString } from 'class-validator';

export class CreateUserProjectDto {
  @IsString()
  start_on_project: string;

  @IsString()
  end_on_project: string;

  @IsNumber()
  userId: number;

  @IsNumber()
  projectId: number;
}
