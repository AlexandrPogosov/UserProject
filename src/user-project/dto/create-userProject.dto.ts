import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserProjectDto {
  @Field()
  @IsString()
  @ApiProperty({
    type: String,
  })
  start_on_project: string;

  @Field()
  @ApiProperty({
    type: String,
  })
  @IsString()
  end_on_project: string;

  @Field()
  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  userId: number;

  @Field()
  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  projectId: number;
}
