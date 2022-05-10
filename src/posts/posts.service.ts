import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './dtos/create-post.dto';
import { Post } from './schemas/post.schema';
@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  async createPost(body: CreatePostDto): Promise<any> {
    try {
      const newPost = new this.postModel(body);
      return await newPost.save();
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
      console.log(postId);
      return await this.postModel.findById({ _id: postId });
    } catch (error: any) {
      return error;
    }
  }
}
