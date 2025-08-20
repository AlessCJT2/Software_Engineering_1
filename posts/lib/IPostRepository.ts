import { Post } from './Post';

export interface IPostRepository {
  save(post: Post): Promise<void>;
  getPostById(id: number): Promise<Post | null>;
  getAllPosts(): Promise<Post[]>;
  updatePost(post: Post): Promise<void>;
}