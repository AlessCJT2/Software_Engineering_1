import { Post } from './Post';

export async function createPost(title: string, content: string): Promise<{ id: number } | null> {
  try {
    const post = new Post(title, content);
    const res = await fetch('/api/savePost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: post.getTitle(), content: post.getContent() }),
    });
    const data = await res.json();
    if (res.ok) {
      post.setId(data.id);
      return { id: data.id };
    }
    return null;
  } catch (error) {
    console.error("Error al crear post:", (error as Error).message);
    return null;
  }
}