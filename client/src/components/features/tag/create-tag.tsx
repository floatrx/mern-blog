import type { ITagCreate } from '@/types/tag';
import { Button } from '@/components/ui/button/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form/form';
import { Input } from '@/components/ui/form/input';
import { createTagSchema } from '@/validators/tag';
import { useCreateTagMutation } from '@/api/tags';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const CreateTag = () => {
  const [createTag, { isLoading }] = useCreateTagMutation(); // Create tag

  // Create form
  const form = useForm<ITagCreate>({
    resolver: zodResolver(createTagSchema),
    defaultValues: { name: '' },
    delayError: 3000,
  });

  const handleSubmit = form.handleSubmit((values: ITagCreate) => {
    createTag(values);
    form.reset();
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="flex flex-shrink-0 gap-2">
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Type tag name" className="min-w-[300px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" loading={isLoading} variant="secondary">
          Add new
        </Button>
      </form>
    </Form>
  );
};
