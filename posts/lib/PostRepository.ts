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

  async getAllPosts(): Promise<Post[]> {
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, content');
    if (error) throw new Error("Error al obtener posts: " + error.message);
    return data.map((item) => {
      const post = new Post(item.title, item.content);
      post.setId(item.id);
      return post;
    });
  }

  async updatePost(post: Post): Promise<void> {
    if (!post.getId()) throw new Error("El post no tiene un ID válido.");
    const { error } = await supabase
      .from('posts')
      .update({ title: post.getTitle(), content: post.getContent() })
      .eq('id', post.getId());
    if (error) throw error;
  }
}