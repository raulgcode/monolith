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
import type { Route } from './+types/register';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
});

export function meta() {
  return [{ title: 'Register' }, { name: 'description', content: 'Create a new account' }];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: registerSchema });

  if (submission.status !== 'success') {
    return data(submission.reply(), { status: 400 });
  }

  try {
    const response = await api.post('/auth/register', {
      email: submission.value.email,
      password: submission.value.password,
      name: submission.value.name,
    });

    return redirect('/', {
      headers: {
        'Set-Cookie': await authCookie.serialize(response.data.access_token),
      },
    });
  } catch (error: any) {
    const message =
      error?.response?.data?.message || 'Registration failed. Please try again.';
    return data(
      submission.reply({ formErrors: [message] }),
      { status: 400 },
    );
  }
}

export default function RegisterPage() {
  const lastResult = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: registerSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>Get started with your new account</CardDescription>
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
                placeholder="John Doe"
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
                autoComplete="new-password"
              />
              {fields.password.errors && (
                <p className="text-sm text-destructive">{fields.password.errors[0]}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <a href="/login" className="text-primary underline-offset-4 hover:underline">
              Sign in
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
