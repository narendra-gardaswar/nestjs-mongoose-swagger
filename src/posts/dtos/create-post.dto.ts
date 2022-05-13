import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Post title is required' })
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Post body is required' })
  readonly body: string;
}
