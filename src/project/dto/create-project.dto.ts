import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProjectDTO {
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
}
