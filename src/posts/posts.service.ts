import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentsService } from 'src/comments/comments.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { Post } from './schemas/post.schema';
@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    @Inject(forwardRef(() => CommentsService))
    private readonly commentsService: CommentsService,
  ) {}

  async createPost(body: CreatePostDto): Promise<any> {
    try {
      const newPost = new this.postModel(body);
      return await newPost.save();
    } catch (error: any) {
      return error;
    }
  }

  async updatePost(postId: string, body: UpdatePostDto): Promise<any> {
    try {
      await this.postModel.findByIdAndUpdate(postId, body);
      return await this.postModel.findById(postId);
    } catch (error: any) {
      return error;
    }
  }

  async deletePost(postId: string): Promise<any> {
    try {
      const post = await this.postModel.findById(postId);

      if (!post) {
        throw new BadRequestException('Post not found');
      } else {
        return await this.postModel.remove(postId);
      }
    } catch (error: any) {
      return error;
    }
  }
  async findAllPost(): Promise<any> {
    try {
      return await this.postModel.find();
    } catch (error: any) {
      return error;
    }
  }

  async findOnePost(postId: string): Promise<any> {
    try {
      const post = await this.postModel.findById(postId);

      if (!post) {
        throw new BadRequestException('Post not found');
      } else {
        return post;
      }
    } catch (error) {
      return error;
    }
  }

  async findOnePostComments(postId: string): Promise<any> {
    try {
      return await this.commentsService.findCommentsForPostId(postId);
    } catch (error) {
      return error;
    }
  }
}
