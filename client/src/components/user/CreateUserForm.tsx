import type { IUserCreate } from '@/types/user';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { createUserSchema } from '@/validators/user';
import { useCreateUserMutation, useSearchUsersQuery } from '@/api/users';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
  const { data: users = [] } = useSearchUsersQuery(); // Fetch users
  const [createUser, { isLoading }] = useCreateUserMutation(); // Create user

  // Create form
  const form = useForm<IUserCreate>({
    resolver: zodResolver(createUserSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  return (
    <Card>
      <div className="m-2 flex gap-2">
        <span>Users</span> <Badge>{users?.length}</Badge>
        {isLoading && <Spinner />}
      </div>

      {/*TEST*/}
      <div className="p-4 pt-2" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(createUser)} className="m-2 max-w-[350px] space-y-5 rounded-xl border-2 p-5">
          <h2 className="text-lg">Add a new user</h2>

          {
            // Render form fields
            Object.entries(formFields).map(([name, { label, placeholder }]) => (
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
            ))
          }

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </Card>
  );
};
