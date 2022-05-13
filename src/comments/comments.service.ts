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
import { CommentDetails } from './interfaces/comment-details.interface';
import { CommentDocument } from './schema/comment.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel('Comment')
    private readonly commentModel: Model<CommentDocument>,
    @Inject(forwardRef(() => PostsService))
    private readonly postsService: PostsService,
  ) {}

  _getCommentDetials(comment: CommentDocument): CommentDetails {
    return {
      id: comment._id,
      postId: comment.postId,
      body: comment.body,
    };
  }

  async createComment(
    postId: string,
    body: CreateCommentDto,
  ): Promise<CommentDetails> {
    const existingPost = await this.postsService.findById(postId);
    if (!existingPost) throw new NotFoundException('Post not found');
    const newComment = new this.commentModel(body);
    let comment: any = await newComment.save();
    if (!comment)
      throw new InternalServerErrorException('Failed to create comment');
    comment.postId = postId;
    await comment.save();

    let post: any = await this.postsService.findById(postId);
    if (!post) throw new NotFoundException('Post not found');
    await post.comments.push(comment._id);
    const updatedPost = new this.commentModel(post);
    await updatedPost.save();

    return this._getCommentDetials(comment);
  }

  async findById(id: string): Promise<any> {
    const comments = await this.commentModel.find({ postId: id });
    if (!comments) throw new NotFoundException('Comments not found');
    return comments.map((comment) => this._getCommentDetials(comment));
  }
}
