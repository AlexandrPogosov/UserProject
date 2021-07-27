import { IsString, IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserDTO {
  @Field()
  @ApiProperty({
    type: String,
  })
  @IsString()
  last_name: string;

  @Field()
  @ApiProperty({
    type: String,
  })
  @IsString()
  first_name: string;

  @Field()
  @ApiProperty({
    type: String,
  })
  @IsString()
  date_birthday: string;

  @Field(() => Int)
  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  age: number;

  @Field()
  @ApiProperty({
    type: String,
  })
  @IsString()
  technology: string;

  @Field()
  @ApiProperty({
    type: String,
  })
  @IsString()
  skills: string;
}
