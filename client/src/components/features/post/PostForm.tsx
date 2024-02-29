import type { IPostCreate } from '@/types/post';
import { Button } from '@/components/ui/button/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form/Form';
import { Input } from '@/components/ui/form/Input';
import { MarkdownEditor } from '@/components/editor/MarkdownEditor';
import { Upload } from '@/components/features/post/Upload';
import { createPostSchema } from '@/validators/post';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';

interface IProps {
  onSubmit: (values: IPostCreate) => Promise<void>;
  initialValues?: IPostCreate;
  id?: string;
  isLoading?: boolean;
}

export const PostForm = (props: IProps) => {
  const { toast } = useToast();

  const form = useForm<IPostCreate>({
    resolver: zodResolver(createPostSchema),
    defaultValues: { title: '', body: '', thumbnail: '', ...props.initialValues },
  });

  const handleSubmit = async (values: IPostCreate) => {
    try {
      await props.onSubmit(values);
      toast({ title: `Post ${props.id ? 'updated' : 'created'}` });
      form.reset();
    } catch (e) {
      console.error('Error creating post:', e.message);
      toast({ title: 'Error', description: e.error.message, variant: 'destructive' });
    }
  };

  return (
    <Card>
      <CardHeader className="flex gap-2">
        <CardTitle className="flex gap-2">
          <span>{props.id ? 'Update' : 'Add'} a new post</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Post title" accept="image/jpeg, image/png, image/webp" multiple={false} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="thumbnail"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Thumbnail</FormLabel>
                    <FormControl>
                      <Upload {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <MarkdownEditor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <Button type="submit" loading={props.isLoading}>
                {props.id ? 'Update' : 'Create New'}
              </Button>
              <Button
                type="reset"
                variant="outline"
                onClick={() => {
                  form.reset();
                  toast({ title: `Post reverted to defaults` });
                }}
              >
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
