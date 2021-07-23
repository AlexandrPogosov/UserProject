import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserProjectDto {
  @IsString()
  @ApiProperty({
    type: String,
  })
  start_on_project: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  end_on_project: string;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  projectId: number;
}
