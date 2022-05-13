import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentsService } from 'src/comments/comments.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostDetails } from './interfaces/post-details.interface';
import { PostDocument } from './schemas/post.schema';
@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<PostDocument>,
    @Inject(forwardRef(() => CommentsService))
    private readonly commentsService: CommentsService,
  ) {}

  _getPostDetials(post: PostDocument): PostDetails {
    return {
      id: post._id,
      title: post.title,
      body: post.body,
      comments: post.comments,
    };
  }

  async findById(id: string): Promise<PostDetails> {
    const post = await this.postModel.findById(id).populate('comments').exec();
    if (!post) throw new NotFoundException('Post not found');
    return this._getPostDetials(post);
  }

  async createPost(post: CreatePostDto): Promise<PostDetails> {
    const newPost = new this.postModel(post);
    const result = await newPost.save();
    if (!result) throw new InternalServerErrorException('Post Not Created');
    return this._getPostDetials(result);
  }

  async updatePost(postId: string, post: UpdatePostDto): Promise<PostDetails> {
    const existingPost = this.findById(postId);
    if (!existingPost) throw new BadRequestException('Post not found');
    const updatedPost = await this.postModel
      .findByIdAndUpdate(postId, post, {
        new: true,
      })
      .exec();
    return this._getPostDetials(updatedPost);
  }

  async deletePost(postId: string): Promise<{ response: string }> {
    const existingPost = this.findById(postId);
    if (!existingPost)
      throw new BadRequestException('Post not found, Failed to delete');
    await this.postModel.findByIdAndDelete(postId);
    return { response: 'Post deleted successfully' };
  }

  async findAll(): Promise<any> {
    const posts = await this.postModel.find().exec();
    if (!posts) throw new BadRequestException('Posts not found');
    return posts.map((post) => this._getPostDetials(post));
  }

  async findPostComments(postId: string): Promise<any> {
    return await this.commentsService.findById(postId);
  }
}
