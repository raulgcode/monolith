import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { useUser } from '~/context';

export function meta() {
  return [{ title: 'Dashboard' }, { name: 'description', content: 'Your dashboard' }];
}

export default function DashboardPage() {
  const user = useUser();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back{user.name ? `, ${user.name}` : ''}!
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Start building your application</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This is your dashboard. Edit{' '}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">
                app/routes/_layout.dashboard.tsx
              </code>{' '}
              to customize this page.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add Routes</CardTitle>
            <CardDescription>Create new pages for your app</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Add new protected routes by creating files like{' '}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">
                _layout.your-page.tsx
              </code>{' '}
              inside the routes folder.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Ready</CardTitle>
            <CardDescription>Backend is set up and running</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Your NestJS API is running with JWT authentication, Prisma ORM, and PostgreSQL. Add
              new modules in <code className="rounded bg-muted px-1 py-0.5 text-xs">apps/api/src/</code>.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
