import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Post title is required' })
  @ApiProperty()
  readonly title: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Post body is required' })
  @ApiProperty()
  readonly body: string;
}
