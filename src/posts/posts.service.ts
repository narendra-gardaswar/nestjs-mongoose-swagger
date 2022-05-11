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

  async createPost(createPostDto: CreatePostDto): Promise<any> {
    const newPost: Post = new this.postModel(createPostDto);
    return await newPost.save();
  }

  async updatePost(postId: string, updatePostDto: UpdatePostDto): Promise<any> {
    let post: Post = await this.postModel.findById(postId);
    if (!post) throw new BadRequestException('Post not found');
    const updatedPost: Post = new this.postModel(updatePostDto);
    post = updatedPost;
    return await post.save();
  }

  async deletePost(postId: string): Promise<any> {
    const post: Post = await this.postModel.findById(postId);
    if (!post) throw new BadRequestException('Post not found');
    return await post.remove();
  }

  async findAllPost(): Promise<any> {
    const posts: any = await this.postModel.find();
    if (!posts) throw new BadRequestException('Posts not found');
    return posts;
  }

  async findOnePost(postId: string): Promise<any> {
    const post: Post = await this.postModel.findById(postId);
    if (!post) throw new BadRequestException('Post not found');
    return post;
  }

  async findOnePostComments(postId: string): Promise<any> {
    return await this.commentsService.findCommentsByPostId(postId);
  }
}
