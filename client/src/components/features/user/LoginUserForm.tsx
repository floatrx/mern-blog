import type { IUserLoginRequest } from '@/types/user';
import { Button } from '@/components/ui/button/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form/Form';
import { Input } from '@/components/ui/form/Input';
import { Lock } from 'lucide-react';
import { Spinner } from '@/components/ui/Spinner';
import { UserLogoutButton } from '@/components/features/user/UserLogoutButton';
import { cn } from '@/lib/utils';
import { loginUserSchema } from '@/validators/user';
import { selectIsLoggedIn, selectUser } from '@/store/auth';
import { useAppSelector } from '@/hooks/redux';
import { useForm } from 'react-hook-form';
import { useLazyCheckQuery, useLoginMutation } from '@/api/auth';
import { zodResolver } from '@hookform/resolvers/zod';

const formFields = {
  email: {
    label: 'Email',
    placeholder: 'example@domain.com',
    type: 'email',
  },
  password: {
    label: 'Password',
    placeholder: '*****',
    type: 'password',
  },
};

export const LoginUserForm = () => {
  const [login, { isLoading }] = useLoginMutation(); // Create user
  const [checkSession] = useLazyCheckQuery(); // just for testing

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const user = useAppSelector(selectUser);

  // Create form
  const form = useForm<IUserLoginRequest>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: { email: 'admin@test.com', password: '123' },
    disabled: isLoading,
  });

  // Just for testing
  const handleTest = () => {
    checkSession();
  };

  const handleLogin = form.handleSubmit(async (values) => {
    login(values);
  }, console.error);

  if (isLoggedIn) {
    return (
      <Card className="m-auto max-w-xs text-center">
        <CardHeader>
          <CardTitle>Welcome back! {user.email}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-2">
            <UserLogoutButton />
            <Button type="button" onClick={handleTest} variant="secondary">
              Test session
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn({ 'pointer-events-none opacity-65': isLoading }, 'm-auto max-w-[360px]')}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-blue-500">Login</span> <Lock />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form noValidate onSubmit={handleLogin} className="space-y-3">
            {Object.entries(formFields).map(([name, { label, placeholder, type }]) => (
              <FormField
                key={name}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input type={type} placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <div className="flex gap-4">
              <Button type="submit" variant={isLoading ? 'ghost' : 'default'} className="w-[90px]">
                {isLoading ? <Spinner /> : <>Submit</>}
              </Button>
              <Button type="button" onClick={handleTest} variant="secondary">
                Test session
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
