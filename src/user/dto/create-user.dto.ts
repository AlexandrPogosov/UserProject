import { IsString, IsNumber, IsDate } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  last_name: string;

  @IsString()
  first_name: string;

  @IsString()
  date_birthday: string;

  @IsNumber()
  age: number;

  @IsString()
  technology: string;

  @IsString()
  skills: string;
}
