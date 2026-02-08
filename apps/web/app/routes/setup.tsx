import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { data, redirect, useActionData, useNavigation } from 'react-router';
import { z } from 'zod';
import { api } from '~/lib/api';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import type { Route } from './+types/setup';

const setupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number')
    .regex(/[!@#$%^&*]/, 'Must contain at least one special character'),
});

export function meta() {
  return [
    { title: 'Initial Setup' },
    { name: 'description', content: 'Set up your first admin account' }
  ];
}

// Loader: Verificar si ya hay usuarios
export async function loader({ request }: Route.LoaderArgs) {
  try {
    const response = await api.get('/auth/setup-status');

    // Si ya hay usuarios, redirigir a login
    if (!response.data.needsSetup) {
      throw redirect('/login');
    }

    return { needsSetup: true };
  } catch (error) {
    // Si es un redirect, lanzarlo
    if (error instanceof Response) {
      throw error;
    }
    // Si hay error de red, permitir acceso (fail-open para setup)
    return { needsSetup: true };
  }
}

// Action: Crear primer usuario
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: setupSchema });

  if (submission.status !== 'success') {
    return data(submission.reply(), { status: 400 });
  }

  try {
    await api.post('/auth/setup', {
      email: submission.value.email,
      password: submission.value.password,
      name: submission.value.name,
    });

    // Redirigir a login después de crear el usuario
    return redirect('/login');
  } catch (error: any) {
    const message =
      error?.response?.data?.message || 'Setup failed. Please try again.';
    return data(
      submission.reply({ formErrors: [message] }),
      { status: 400 },
    );
  }
}

export default function SetupPage() {
  const lastResult = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: setupSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Initial Setup</CardTitle>
          <CardDescription>
            Create your first admin account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form method="post" id={form.id} onSubmit={form.onSubmit} className="space-y-4">
            {form.errors && form.errors.length > 0 && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {form.errors.map((error, i) => (
                  <p key={i}>{error}</p>
                ))}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor={fields.name.id}>Name</Label>
              <Input
                id={fields.name.id}
                name={fields.name.name}
                type="text"
                placeholder="Admin User"
                autoComplete="name"
              />
              {fields.name.errors && (
                <p className="text-sm text-destructive">{fields.name.errors[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={fields.email.id}>Email</Label>
              <Input
                id={fields.email.id}
                name={fields.email.name}
                type="email"
                placeholder="admin@example.com"
                autoComplete="email"
              />
              {fields.email.errors && (
                <p className="text-sm text-destructive">{fields.email.errors[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={fields.password.id}>Password</Label>
              <Input
                id={fields.password.id}
                name={fields.password.name}
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
              />
              {fields.password.errors && (
                <p className="text-sm text-destructive">{fields.password.errors[0]}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Must be at least 8 characters with uppercase, number and special character
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account...' : 'Create Admin Account'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
