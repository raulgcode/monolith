import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  // Public routes
  route('login', 'routes/login.tsx'),
  route('register', 'routes/register.tsx'),
  route('logout', 'routes/logout.tsx'),

  // Protected routes (require authentication)
  layout('routes/_layout.tsx', [
    index('routes/_layout.dashboard.tsx'),
    route('profile', 'routes/_layout.profile.tsx'),
  ]),
] satisfies RouteConfig;
