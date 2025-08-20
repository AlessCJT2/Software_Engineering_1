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