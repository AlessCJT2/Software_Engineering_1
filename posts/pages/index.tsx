import { useState } from 'react';
import { createPost } from '../lib/postFunctions';
import { Title } from '../lib/Title';
import { Content } from '../lib/Content';

export default function Home() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [titleError, setTitleError] = useState<string | null>(null);
  const [contentError, setContentError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    try {
      new Title(title);
      setTitleError(null);
    } catch (error) {
      setTitleError((error as Error).message);
      valid = false;
    }
    try {
      new Content(content);
      setContentError(null);
    } catch (error) {
      setContentError((error as Error).message);
      valid = false;
    }
    if (valid) {
      const result = await createPost(title, content);
      if (result) setMessage(`Post guardado con ID: ${result.id}`);
      else setMessage('Error al guardar');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Gestión de Publicaciones</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ display: 'block', margin: '10px 0' }}
          />
          {titleError && <p style={{ color: 'red' }}>{titleError}</p>}
        </div>
        <div>
          <label>Contenido:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ display: 'block', margin: '10px 0' }}
          />
          {contentError && <p style={{ color: 'red' }}>{contentError}</p>}
        </div>
        <button type="submit">Crear Post</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}