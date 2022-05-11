import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Post title is required' })
  readonly title: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Post body is required' })
  readonly body: string;
}
