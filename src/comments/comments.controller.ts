import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiTags('Comments')
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Post('/:id')
  async createComment(
    @Param('id') postId: string,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<any> {
    return await this.commentsService.createComment(postId, createCommentDto);
  }

  @ApiTags('Comments')
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Get()
  public async findCommentsByPostId(
    @Query() query: { postId: string },
  ): Promise<any> {
    return await this.commentsService.findById(query.postId);
  }
}
