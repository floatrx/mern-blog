import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form/Form';
import { Input } from '@/components/ui/form/Input';
import { MarkdownEditor } from '@/components/editor/MarkdownEditor';
import { Upload } from '@/components/features/post/Upload';
import { createPostSchema } from '@/validators/post';
import { useCreatePostMutation } from '@/api/posts';

import type { IPostCreate } from '@/types/post';

export const CreatePostForm = () => {
  const [createPost, { isLoading }] = useCreatePostMutation(); // Create user

  // Create form
  const form = useForm<IPostCreate>({
    resolver: zodResolver(createPostSchema),
    defaultValues: { title: 'Test post', body: '', thumbnail: '' },
  });

  const handleCreate = async (values: IPostCreate) => {
    try {
      const res = await createPost(values).unwrap();
      console.log('Post created:', res);
      form.reset();
    } catch (e) {
      console.error('Error creating post:', e.message);
    }
  };

  return (
    <Card>
      <CardHeader className="flex gap-2">
        <CardTitle className="flex gap-2">
          <span>Add a new post</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-6">
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
            <Button type="submit" loading={isLoading}>
              Create New
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
