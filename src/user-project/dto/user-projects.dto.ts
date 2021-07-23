import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateProjectDTO } from '../../project/dto/create-project.dto';
import { Project } from '../../project/project.entity';

export class UserProjectsDto {
  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    type: String,
  })
  @IsString()
  last_name: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  first_name: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  date_birthday: string;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  age: number;

  @ApiProperty({
    type: String,
  })
  @IsString()
  technology: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  skills: string;

  @ApiProperty({
    type: Project,
    isArray: true,
  })
  projects: Project[];
}
