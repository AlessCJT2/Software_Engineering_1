import { PostRepository } from '../lib/PostRepository';
import { setPostRepository } from '../lib/postFunctions';

function MyApp({ Component, pageProps }: { Component: React.ComponentType; pageProps: any }) {
  setPostRepository(new PostRepository());
  return <Component {...pageProps} />;
}

export default MyApp;