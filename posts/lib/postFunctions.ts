import { Post } from './Post';
import { IPostRepository } from './IPostRepository';

let repository: IPostRepository;

export function setPostRepository(repo: IPostRepository): void {
  repository = repo;
}

export async function createPost(title: string, content: string): Promise<{ id: number } | null> {
  try {
    const post = new Post(title, content);
    if (repository) await repository.save(post);
    return post.getId() ? { id: post.getId()! } : null;
  } catch (error) {
    console.error("Error al crear post:", (error as Error).message);
    return null;
  }
}

export async function getPostById(id: number): Promise<Post | null> {
  if (!repository) return null;
  return await repository.getPostById(id);
}

export async function getAllPosts(): Promise<Post[]> {
  if (!repository) return [];
  return await repository.getAllPosts();
}

export async function updatePost(title: string, content: string, id: number): Promise<boolean> {
  if (!repository) return false;
  try {
    const post = new Post(title, content);
    post.setId(id);
    await repository.updatePost(post);
    return true;
  } catch (error) {
    console.error("Error al actualizar post:", (error as Error).message);
    return false;
  }
}

export async function deletePost(id: number): Promise<boolean> {
  if (!repository) return false;
  try {
    await repository.deletePost(id);
    return true;
  } catch (error) {
    console.error("Error al eliminar post:", (error as Error).message);
    return false;
  }
}