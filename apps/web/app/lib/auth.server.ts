import { redirect } from 'react-router';
import { authCookie } from '~/cookies.server';

export async function getAuthToken(request: Request): Promise<string | null> {
  const cookieHeader = request.headers.get('Cookie');
  const token = await authCookie.parse(cookieHeader);
  return token || null;
}

export async function requireAuth(request: Request): Promise<string> {
  const token = await getAuthToken(request);
  if (!token) {
    throw redirect('/login');
  }
  return token;
}

export async function optionalAuth(request: Request): Promise<string | null> {
  return getAuthToken(request);
}
