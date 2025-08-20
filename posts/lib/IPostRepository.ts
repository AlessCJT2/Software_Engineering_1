import { Post } from './Post';

export interface IPostRepository {
  save(post: Post): Promise<void>;
}