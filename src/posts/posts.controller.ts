import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  //get all posts
  @Get()
  async findAllPost(): Promise<any> {
    return await this.postsService.findAllPost();
  }

  //get single post
  @Get('/:id')
  async findOnePost(@Param('id') postId: string): Promise<any> {
    return await this.postsService.findOnePost(postId);
  }

  //get post comments
  @Get('/:id/comments')
  async findOnePostComments(@Param('id') postId: string): Promise<any> {
    return await this.postsService.findOnePostComments(postId);
  }

  //create post
  @Post()
  async createPost(@Body() createPostDto: CreatePostDto): Promise<any> {
    const post = await this.postsService.createPost(createPostDto);
    return {
      message: 'New Post Added successfully',
      post,
    };
  }

  //Update post
  @Put('/:id')
  async updateUser(
    @Param('id') postId: string,
    @Body() body: UpdatePostDto,
  ): Promise<any> {
    const updatedPost = await this.postsService.updatePost(postId, body);
    return {
      message: 'Post Updated successfully',
      updatedPost,
    };
  }

  //Delete post
  @Delete('/:id')
  async deletePost(@Param('id') postId: string): Promise<any> {
    const updatedPost = await this.postsService.deletePost(postId);
    return {
      message: 'Post Deleted successfully',
    };
  }
}
