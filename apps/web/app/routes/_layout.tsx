import { Outlet, redirect, useLoaderData } from 'react-router';
import { requireAuth } from '~/lib/auth.server';
import { api, createAuthenticatedApi } from '~/lib/api';
import { UserContext, type User } from '~/context';
import { Navbar } from '~/components/navbar/navbar';
import type { Route } from './+types/_layout';

export async function loader({ request }: Route.LoaderArgs) {
  // Primero verificar si necesita setup
  try {
    const setupResponse = await api.get('/auth/setup-status');
    if (setupResponse.data.needsSetup) {
      throw redirect('/setup');
    }
  } catch (error) {
    // Si es un redirect, lanzarlo
    if (error instanceof Response) {
      throw error;
    }
    // Si hay error de red, continuar con la verificación de auth
  }

  // Verificar autenticación
  const token = await requireAuth(request);

  try {
    const authenticatedApi = createAuthenticatedApi(token);
    const response = await authenticatedApi.get('/auth/me');
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
