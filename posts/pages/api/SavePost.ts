import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from '../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, content } = req.body;
    const { data, error } = await supabase
      .from('posts')
      .insert({ title, content })
      .select('id');
    if (error) res.status(500).json({ error: error.message });
    else res.status(200).json({ id: data[0].id });
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}