import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { data, redirect, useActionData, useNavigation } from 'react-router';
import { z } from 'zod';
import { authCookie } from '~/cookies.server';
import { api } from '~/lib/api';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import type { Route } from './+types/login';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

export function meta() {
  return [{ title: 'Login' }, { name: 'description', content: 'Sign in to your account' }];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: loginSchema });

  if (submission.status !== 'success') {
    return data(submission.reply(), { status: 400 });
  }

  try {
    const response = await api.post('/auth/login', {
      email: submission.value.email,
      password: submission.value.password,
    });

    return redirect('/', {
      headers: {
        'Set-Cookie': await authCookie.serialize(response.data.access_token),
      },
    });
  } catch (error: any) {
    const message =
      error?.response?.data?.message || 'Invalid credentials. Please try again.';
    return data(
      submission.reply({ formErrors: [message] }),
      { status: 401 },
    );
  }
}

export default function LoginPage() {
  const lastResult = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
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
              <Label htmlFor={fields.email.id}>Email</Label>
              <Input
                id={fields.email.id}
                name={fields.email.name}
                type="email"
                placeholder="you@example.com"
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
                autoComplete="current-password"
              />
              {fields.password.errors && (
                <p className="text-sm text-destructive">{fields.password.errors[0]}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <a href="/register" className="text-primary underline-offset-4 hover:underline">
              Create one
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
