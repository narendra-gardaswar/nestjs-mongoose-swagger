import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostDetails } from './interfaces/post-details.interface';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtGuard)
  @Get()
  async findAll(): Promise<any> {
    return await this.postsService.findAll();
  }

  @Get('/:id')
  async findPost(@Param('id') postId: string): Promise<PostDetails> {
    return await this.postsService.findById(postId);
  }

  @Get('/:id/comments')
  async findPostComments(@Param('id') postId: string): Promise<any> {
    return await this.postsService.findPostComments(postId);
  }

  @Post()
  async createPost(@Body() post: CreatePostDto): Promise<PostDetails> {
    return await this.postsService.createPost(post);
  }

  @Put('/:id')
  async updatePost(
    @Param('id') postId: string,
    @Body() post: UpdatePostDto,
  ): Promise<PostDetails> {
    return await this.postsService.updatePost(postId, post);
  }

  @Delete('/:id')
  async deletePost(@Param('id') postId: string): Promise<{ response: string }> {
    return await this.postsService.deletePost(postId);
  }
}
