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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostDetails } from './interfaces/post-details.interface';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtGuard)
  @ApiTags('Posts')
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Get()
  async findAll(): Promise<any> {
    return await this.postsService.findAll();
  }

  @ApiBearerAuth('access-token')
  @ApiTags('Posts')
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Get('/:id')
  async findPost(@Param('id') postId: string): Promise<PostDetails> {
    return await this.postsService.findById(postId);
  }

  @ApiBearerAuth('access-token')
  @ApiTags('Posts')
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Get('/:id/comments')
  async findPostComments(@Param('id') postId: string): Promise<any> {
    return await this.postsService.findPostComments(postId);
  }

  @ApiBearerAuth('access-token')
  @ApiTags('Posts')
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Post()
  async createPost(@Body() post: CreatePostDto): Promise<PostDetails> {
    return await this.postsService.createPost(post);
  }

  @ApiBearerAuth('access-token')
  @ApiTags('Posts')
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Put('/:id')
  async updatePost(
    @Param('id') postId: string,
    @Body() post: UpdatePostDto,
  ): Promise<PostDetails> {
    return await this.postsService.updatePost(postId, post);
  }

  @ApiBearerAuth('access-token')
  @ApiTags('Posts')
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Delete('/:id')
  async deletePost(
    @Param('id') postId: string,
  ): Promise<{ response: string; deletedPost: any }> {
    return await this.postsService.deletePost(postId);
  }
}
