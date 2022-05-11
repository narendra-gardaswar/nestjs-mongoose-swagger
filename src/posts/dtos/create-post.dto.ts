import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty({ message: 'Post title is required' })
  readonly title: string;

  @IsNotEmpty({ message: 'Post body is required' })
  readonly body: string;
}
