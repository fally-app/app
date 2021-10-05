import { supabase } from '../lib/client';

export default function App({ user }) {
  console.log({ user });
  return <p>logged in</p>;
}

export async function getServerSideProps({ req }: { req: Request }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return { props: {}, redirect: { destination: '/auth' } };
  }

  return { props: { user } };
}
