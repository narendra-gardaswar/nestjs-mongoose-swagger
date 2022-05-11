import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostsService } from 'src/posts/posts.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { Comment } from './schema/comment.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    @Inject(forwardRef(() => PostsService))
    private readonly postsService: PostsService,
  ) {}

  async createComment(postId: any, body: CreateCommentDto): Promise<any> {
    try {
      const newComment = new this.commentModel(body);
      let comment: any = await newComment.save();
      if (!comment)
        throw new InternalServerErrorException('Failed to create comment');
      comment.postId = postId;
      await comment.save();

      let post: any = await this.postsService.findOnePost(postId);
      if (!post) throw new NotFoundException('Post not found');
      await post.comments.push(comment._id);
      await post.save();

      return comment;
    } catch (error) {
      console.log(error);
    }
  }

  async findCommentsByPostId(postId: any): Promise<any> {
    try {
      const comments: any = await this.commentModel.find({ postId: postId });
      if (!comments) throw new NotFoundException('Comments not found');
      return comments;
    } catch (error) {
      console.log(error);
    }
  }
}
