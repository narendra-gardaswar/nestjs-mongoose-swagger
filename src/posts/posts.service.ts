import {
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
    const post = await this.postModel.findById(id);
    if (!post) throw new NotFoundException('Post not found');
    const postDetails = this._getPostDetials(post);
    return postDetails;
  }

  async findAll(): Promise<any> {
    const posts = await this.postModel.find();
    const postDetails = posts.map((post) => this._getPostDetials(post));
    if (postDetails === undefined || postDetails.length == 0)
      throw new NotFoundException('Posts not found');
    return postDetails;
  }

  async createPost(post: CreatePostDto): Promise<PostDetails> {
    const newPost = new this.postModel(post);
    const result = await newPost.save();
    if (!result)
      throw new InternalServerErrorException('Failed to create post');
    return this._getPostDetials(result);
  }

  async updatePost(postId: string, post: UpdatePostDto): Promise<PostDetails> {
    const updatedPost = await this.postModel
      .findByIdAndUpdate(postId, post, {
        new: true,
      })
      .exec();
    if (!updatedPost)
      throw new InternalServerErrorException('Failed to Update post');
    return this._getPostDetials(updatedPost);
  }

  async deletePost(
    postId: string,
  ): Promise<{ response: string; deletedPost: any }> {
    const deletedPost = await this.postModel.findByIdAndDelete(postId);

    if (!deletedPost)
      throw new InternalServerErrorException('Failed to Delete post');

    const deletedCount = await this.commentsService.deleteMany(postId);
    if (deletedCount <= 0)
      throw new InternalServerErrorException('Failed to Delete post');

    return { response: 'Post Deleted', deletedPost: deletedPost };
  }

  async findPostComments(postId: string): Promise<any> {
    const comments = await this.commentsService.findById(postId);
    return comments;
  }
  async addComment(postId: string, commentId: string): Promise<any> {
    return this.postModel.updateOne(
      { _id: postId },
      { $push: { comments: commentId } },
    );
  }
}
