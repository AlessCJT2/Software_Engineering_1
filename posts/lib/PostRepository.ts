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

  async getPostById(id: number): Promise<Post | null> {
    const { data, error } = await supabase
      .from('posts')
      .select('title, content')
      .eq('id', id)
      .single();
    if (error || !data) return null;
    const post = new Post(data.title, data.content);
    post.setId(id);
    return post;
  }
}