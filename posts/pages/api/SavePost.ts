import type { NextApiRequest, NextApiResponse } from 'next';
import { PostRepository } from '../../lib/PostRepository';
import { Post } from '../../lib/Post';

const postRepository = new PostRepository();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, content } = req.body;
    try {
      const post = new Post(title, content);
      await postRepository.save(post);
      res.status(200).json({ id: post.getId() });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}