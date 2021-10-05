import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { supabase } from '../lib/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';

function MyApp({ Component, pageProps }: AppProps) {
  const [authenticated, setAuthenticated] = useState('not-authenticated');
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      handleChange(event, session);
      if (event == 'SIGNED_IN') {
        setAuthenticated('authenticated');
        router.push('/app');
      }

      if (event == 'SIGNED_OUT') {
        setAuthenticated('not-authenticated');
      }
    });

    checkUser();

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  function checkUser() {
    const user = supabase.auth.user();

    if (user) setAuthenticated('authenticated');
  }

  async function handleChange(event, session) {
    fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    });
  }

  return (
    <div>
      {authenticated && (
        <nav>
          <p>Navigation</p>
        </nav>
      )}

      <Component {...pageProps} />
    </div>
  );
}
export default MyApp;
