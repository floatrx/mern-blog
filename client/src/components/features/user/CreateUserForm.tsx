import type { IUserCreateRequest } from '@/types/user';
import { Button } from '@/components/ui/button/Button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form/Form';
import { Input } from '@/components/ui/form/Input';
import { createUserSchema } from '@/validators/user';
import { useCreateUserMutation } from '@/api/users';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
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

export const CreateUserForm = ({ onFinish }: { onFinish?: () => void }) => {
  const [createUser, { isLoading }] = useCreateUserMutation(); // Create user
  const { toast } = useToast();

  // Create form
  const form = useForm<IUserCreateRequest>({
    resolver: zodResolver(createUserSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const handleCreateUser = form.handleSubmit(async (values) => {
    try {
      await createUser(values);
      form.reset();
      onFinish?.();
      toast({ title: 'User created', description: 'User has been created successfully' });
    } catch (e) {
      console.error(e.message);
      toast({ title: 'Error', description: e.message });
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={handleCreateUser} className="w-full space-y-3">
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
        <Button type="submit" loading={isLoading} variant="outline" size="lg">
          Submit
        </Button>
      </form>
    </Form>
  );
};
