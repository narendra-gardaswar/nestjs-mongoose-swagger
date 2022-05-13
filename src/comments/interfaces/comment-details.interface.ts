import { Post } from 'src/posts/schemas/post.schema';

export interface CommentDetails {
  id: string;
  postId: Post;
  body: string;
}
