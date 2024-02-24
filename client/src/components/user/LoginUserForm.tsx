import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { loginUserSchema } from '@/validators/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLazyCheckQuery, useLoginMutation } from '@/api/auth';

import type { IUserLoginRequest } from '@/types/user';
import { cn } from '@/lib/utils';
import { BiKey } from 'react-icons/bi';

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
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));
  const [login, { isLoading }] = useLoginMutation(); // Create user
  const [checkSession] = useLazyCheckQuery(); // just for testing

  // Create form
  const form = useForm<IUserLoginRequest>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: { email: 'admin@test.com', password: '123' },
    disabled: isLoading,
  });

  const handleTest = () => checkSession();

  const handleLogin = form.handleSubmit(async (values) => {
    const response = await login(values).unwrap();
    setIsLoggedIn(!!response.accessToken);
  }, console.error);

  if (isLoggedIn) {
    return (
      <Card className="m-auto max-w-xs text-center">
        <CardHeader>
          <CardTitle>Welcome back!</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            className="w-[180px]"
            onClick={() => {
              localStorage.removeItem('accessToken');
              setIsLoggedIn(false);
            }}
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn({ 'pointer-events-none opacity-65': isLoading }, 'm-auto max-w-[360px]')}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-blue-500">Login</span> <BiKey className="rotate-90 text-4xl" />
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
