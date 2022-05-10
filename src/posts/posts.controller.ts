import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  //get all posts
  @Get()
  public async findAllPost(): Promise<any> {
    return await this.postsService.findAllPost();
  }

  //get single post
  @Get('/:id')
  public async findOnePost(@Param('id') postId: string): Promise<any> {
    return await this.postsService.findOnePost(postId);
  }

  //create post
  @Post('/create')
  public async createPost(@Body() createPostDto: CreatePostDto): Promise<any> {
    const post = await this.postsService.createPost(createPostDto);
    return {
      message: 'New Post Added successfully',
      post,
    };
  }
}
