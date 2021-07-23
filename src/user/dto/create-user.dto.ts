import { IsString, IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
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
}
