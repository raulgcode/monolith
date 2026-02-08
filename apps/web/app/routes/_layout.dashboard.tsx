import { Zap, Palette, Rocket, Shield, Code, Database } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { useUser } from '~/context';
import { useTheme } from '@monolith/themes/react';

export function meta() {
  return [{ title: 'Dashboard' }, { name: 'description', content: 'Your dashboard' }];
}

export default function DashboardPage() {
  const user = useUser();
  const { theme } = useTheme();
  const isGradient = theme === 'gradient';

  return (
    <div className="space-y-8">
      {/* Hero section usando colores del tema */}
      <div
        className={`relative rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden text-primary-foreground ${isGradient ? 'bg-linear-to-br from-primary via-accent to-secondary' : 'bg-primary'}`}
      >
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(white,transparent_85%)]" />

        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Welcome back{user.name ? `, ${user.name}` : ''}!
          </h1>
          <p className="mt-3 text-lg opacity-90">
            Here's what's happening with your projects today.
          </p>
        </div>

        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/20 rounded-full blur-2xl" />
      </div>

      {/* Stats cards usando colores del tema */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="group border-2 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer hover:border-primary/50">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 ${isGradient ? 'bg-linear-to-br from-primary to-accent' : 'bg-primary'}`}
              >
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl">Getting Started</CardTitle>
                <CardDescription>Quick start guide</CardDescription>
              </div>
            </div>
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

        <Card className="group border-2 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer hover:border-accent/50">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 ${isGradient ? 'bg-linear-to-br from-accent to-primary' : 'bg-accent'}`}
              >
                <Palette className="w-6 h-6 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl">Theme System</CardTitle>
                <CardDescription>Multiple themes available</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Switch between themes using the palette icon in the navbar. Try Neutral, Gradient, or
              Legal themes!
            </p>
          </CardContent>
        </Card>

        <Card className="group border-2 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer hover:border-secondary/50">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 ${isGradient ? 'bg-linear-to-br from-secondary to-primary' : 'bg-secondary'}`}
              >
                <Rocket className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl">Add Routes</CardTitle>
                <CardDescription>Create new pages</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Add new protected routes by creating files like{' '}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">_layout.your-page.tsx</code>{' '}
              inside the routes folder.
            </p>
          </CardContent>
        </Card>

        <Card className="group border-2 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer hover:border-primary/50">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 ${isGradient ? 'bg-linear-to-br from-primary to-secondary' : 'bg-primary'}`}
              >
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl">Authentication</CardTitle>
                <CardDescription>Secure by default</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              JWT authentication with refresh tokens, password hashing, and secure session
              management built-in and ready to use.
            </p>
          </CardContent>
        </Card>

        <Card className="group border-2 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer hover:border-accent/50">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 ${isGradient ? 'bg-linear-to-br from-accent to-secondary' : 'bg-accent'}`}
              >
                <Code className="w-6 h-6 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl">API Ready</CardTitle>
                <CardDescription>NestJS backend</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Your NestJS API is running with JWT authentication, Prisma ORM, and PostgreSQL. Add
              new modules in{' '}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">apps/api/src/</code>.
            </p>
          </CardContent>
        </Card>

        <Card className="group border-2 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer hover:border-secondary/50">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 ${isGradient ? 'bg-linear-to-br from-secondary to-accent' : 'bg-secondary'}`}
              >
                <Database className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl">Database</CardTitle>
                <CardDescription>Prisma + PostgreSQL</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Type-safe database access with Prisma ORM. Define your schema, run migrations, and
              query your data with confidence.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
