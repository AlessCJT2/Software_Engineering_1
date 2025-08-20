import { IPostRepository } from './IPostRepository';
import { Post } from './Post';
import supabase from './supabaseClient';

export class PostRepository implements IPostRepository {
  async save(post: Post): Promise<void> {
    const { data, error } = await supabase
      .from('posts')
      .insert({ title: post.getTitle(), content: post.getContent() })
      .select('id');
    if (error) throw error;
    post.setId(data[0].id);
  }
}