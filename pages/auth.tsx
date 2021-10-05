import Head from 'next/head';
import { useState } from 'react';

import { supabase } from '../lib/client';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  async function signIn() {
    if (!email) return;

    const { error, data } = await supabase.auth.signIn({ email });

    if (error) {
      console.error({ error });
    } else {
      setSubmitted(true);
      console.log({ data });
    }
  }

  if (submitted) {
    return (
      <div>
        <p>Please check your email to sigin!</p>
      </div>
    );
  } else {
    return (
      <>
        <Head>
          <title>Signin here</title>
        </Head>

        <form>
          <input type="email" required onChange={(e) => setEmail(e.target.value)} />
          <input
            type="submit"
            value="Submit"
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          />
        </form>
      </>
    );
  }
}

export async function getServerSideProps({ req }: { req: Request }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (user) {
    return { props: {}, redirect: { destination: '/app' } };
  }

  return { props: {} };
}
