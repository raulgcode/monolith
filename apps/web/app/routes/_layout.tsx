import { Outlet, redirect, useLoaderData } from 'react-router';
import { requireAuth } from '~/lib/auth.server';
import { createAuthenticatedApi } from '~/lib/api';
import { UserContext, type User } from '~/context';
import { Navbar } from '~/components/navbar/navbar';
import type { Route } from './+types/_layout';

export async function loader({ request }: Route.LoaderArgs) {
  const token = await requireAuth(request);

  try {
    const api = createAuthenticatedApi(token);
    const response = await api.get('/auth/me');
    return { user: response.data as User };
  } catch {
    throw redirect('/login');
  }
}

export default function ProtectedLayout() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <UserContext value={user}>
      <div className="min-h-screen bg-background">
        <Navbar user={user} />
        <main className="container mx-auto px-4 py-8">
          <Outlet />
        </main>
      </div>
    </UserContext>
  );
}
