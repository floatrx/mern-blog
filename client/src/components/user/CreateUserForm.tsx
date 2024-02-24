import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { createUserSchema } from '@/validators/user';
import { useCreateUserMutation } from '@/api/users';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { IUserCreate } from '@/types/user';

const formFields = {
  name: {
    label: 'Username',
    placeholder: 'John Doe',
  },
  email: {
    label: 'Email',
    placeholder: 'example@mail.com',
  },
  password: {
    label: 'Password',
    placeholder: '*****',
  },
};

export const CreateUserForm = () => {
  const [createUser, { isLoading }] = useCreateUserMutation(); // Create user

  // Create form
  const form = useForm<IUserCreate>({
    resolver: zodResolver(createUserSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  return (
    <Card className="max-w-sm">
      <CardHeader className="flex gap-2">
        <CardTitle>
          <span>Add a new user</span>
          {isLoading && <Spinner />}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(createUser)} className="space-y-3">
            {Object.entries(formFields).map(([name, { label, placeholder }]) => (
              <FormField
                key={name}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit">Create New</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
