import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/user.entity';
import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class ProjectUsersDto {
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
  name: string;

  @Field()
  @ApiProperty({
    type: String,
  })
  @IsString()
  company_name: string;

  @Field(() => [User])
  @ApiProperty({
    type: User,
    isArray: true,
  })
  users: User[];
}
