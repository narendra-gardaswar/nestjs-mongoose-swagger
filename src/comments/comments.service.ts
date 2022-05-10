import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostsService } from 'src/posts/posts.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { Comment } from './schema/comment.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    private readonly postsService: PostsService,
  ) {}

  async createComment(postId: string, body: CreateCommentDto): Promise<any> {
    try {
      const newComment = new this.commentModel(body);
      let comment: any = await newComment.save();
      await comment.postId.push(postId);
      await comment.save();

      let post: any = await this.postsService.findOnePost(postId);
      await post.comments.push(comment._id);
      await post.save();

      return comment;
    } catch (error: any) {
      return error;
    }
  }
}