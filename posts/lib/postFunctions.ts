import { Title } from './Title';
import { Content } from './Content';

export async function createPost(title: string, content: string): Promise<{ id: number } | null> {
  try {
    new Title(title);
    new Content(content);
    const res = await fetch('/api/savePost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    const data = await res.json();
    return res.ok ? data : null;
  } catch (error) {
    console.error("Error al crear post:", (error as Error).message);
    return null;
  }
}