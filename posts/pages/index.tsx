import { useState } from 'react';
import { Title } from '../lib/Title';
import { Content } from '../lib/Content';

export default function Home() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [titleError, setTitleError] = useState<string | null>(null);
  const [contentError, setContentError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      new Title(title);
      setTitleError(null);
    } catch (error) {
      setTitleError((error as Error).message);
    }
    try {
      new Content(content);
      setContentError(null);
    } catch (error) {
      setContentError((error as Error).message);
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
    </div>
  );
}