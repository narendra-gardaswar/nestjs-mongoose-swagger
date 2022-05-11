import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  //Create comment for a post
  @Post('/:id')
  async createComment(
    @Param('id') postId: string,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<any> {
    return await this.commentsService.createComment(postId, createCommentDto);
  }

  //FInd  comments by PostId
  @Get()
  public async findCommentsByPostId(
    @Query() query: { postId: string },
  ): Promise<any> {
    return await this.commentsService.findCommentsByPostId(query.postId);
  }
}
