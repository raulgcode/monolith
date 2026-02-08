import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { data, useActionData, useNavigation } from 'react-router';
import { z } from 'zod';
import { requireAuth } from '~/lib/auth.server';
import { createAuthenticatedApi } from '~/lib/api';
import { useUser } from '~/context';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';
import type { Route } from './+types/_layout.profile';

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
});

export function meta() {
  return [{ title: 'Profile' }];
}

export async function action({ request }: Route.ActionArgs) {
  const token = await requireAuth(request);
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: changePasswordSchema });

  if (submission.status !== 'success') {
    return data(submission.reply(), { status: 400 });
  }

  try {
    const api = createAuthenticatedApi(token);
    await api.post('/auth/change-password', {
      currentPassword: submission.value.currentPassword,
      newPassword: submission.value.newPassword,
    });

    return data(submission.reply({ resetForm: true }));
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Failed to change password';
    return data(submission.reply({ formErrors: [message] }), { status: 400 });
  }
}

export default function ProfilePage() {
  const user = useUser();
  const lastResult = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: changePasswordSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label className="text-muted-foreground">Email</Label>
            <p className="text-sm font-medium">{user.email}</p>
          </div>
          {user.name && (
            <div className="space-y-1">
              <Label className="text-muted-foreground">Name</Label>
              <p className="text-sm font-medium">{user.name}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your account password</CardDescription>
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
              <Label htmlFor={fields.currentPassword.id}>Current Password</Label>
              <Input
                id={fields.currentPassword.id}
                name={fields.currentPassword.name}
                type="password"
                autoComplete="current-password"
              />
              {fields.currentPassword.errors && (
                <p className="text-sm text-destructive">{fields.currentPassword.errors[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={fields.newPassword.id}>New Password</Label>
              <Input
                id={fields.newPassword.id}
                name={fields.newPassword.name}
                type="password"
                autoComplete="new-password"
              />
              {fields.newPassword.errors && (
                <p className="text-sm text-destructive">{fields.newPassword.errors[0]}</p>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Changing...' : 'Change Password'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
