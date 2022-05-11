import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Post } from 'src/posts/schemas/post.schema';

@Schema()
export class Comment extends Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  })
  postId: Post;

  @Prop()
  body: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
