import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Project } from '../../project/project.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserProjectsDto {
  @Field(() => Int)
  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  id: number;

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

  @Field(() => [Project])
  @ApiProperty({
    type: Project,
    isArray: true,
  })
  projects: Project[];
}
