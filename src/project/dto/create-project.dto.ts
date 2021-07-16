import { IsString } from 'class-validator';

export class CreateProjectDTO {
  @IsString()
  name: string;

  @IsString()
  company_name: string;
}