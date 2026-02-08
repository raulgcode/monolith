import { redirect } from 'react-router';
import { authCookie } from '~/cookies.server';
import type { Route } from './+types/logout';

export async function loader({ request }: Route.LoaderArgs) {
  return redirect('/login', {
    headers: {
      'Set-Cookie': await authCookie.serialize('', { maxAge: 0 }),
    },
  });
}
