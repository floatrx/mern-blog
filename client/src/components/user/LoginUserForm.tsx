import { useLoginMutation } from '@/api/auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import type { IUserLoginRequest } from '@/types/user';
import { useForm } from 'react-hook-form';

const formFields = {
  email: {
    label: 'Email',
    placeholder: 'example@mail.com',
  },
  password: {
    label: 'Password',
    placeholder: '*****',
  },
};

export const LoginUserForm = () => {
  const [login, { isLoading }] = useLoginMutation(); // Create user

  // Create form
  const form = useForm<IUserLoginRequest>({
    // resolver: zodResolver(createUserSchema),
    defaultValues: { email: '', password: '' },
  });

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(login)} className="m-2 max-w-[350px] space-y-5 rounded-xl border-2 p-5">
          <h2 className="text-lg">Login {isLoading && <Spinner />}</h2>

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
