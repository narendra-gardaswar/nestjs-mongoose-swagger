import { Body, Controller, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // @Get()
  // public async findAllPost(): Promise<any> {
  //   return await this.postsService.findAllPost();
  // }

  // @Get('/:id')
  // public async findOnePost(@Param('id') postId: string): Promise<any> {
  //   return await this.postsService.findOnePost(postId);
  // }

  @Post('/:id')
  async createComment(
    @Param('id') postId: string,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<any> {
    const comment = await this.commentsService.createComment(
      postId,
      createCommentDto,
    );
    return {
      message: 'New Comment Added successfully',
      comment,
    };
  }
}
