import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  //get comments of a post
  @Get()
  public async findCommentsForPostId(
    @Query() query: { postId: string },
  ): Promise<any> {
    return await this.commentsService.findCommentsForPostId(query.postId);
  }

  //create comments for a post
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
