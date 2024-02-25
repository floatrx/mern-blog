import MDEditor from '@uiw/react-md-editor';
import type { IPostCreate } from '@/types/post';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { useCreatePostMutation } from '@/api/posts';
import { useForm } from 'react-hook-form';

const mkdStr = `
# Markdown Editor

---

**Hello world!!!**

[![](https://avatars.githubusercontent.com/u/1680273?s=80&v=4)](https://avatars.githubusercontent.com/u/1680273?v=4)

\`\`\`javascript
import React from "react";
import ReactDOM from "react-dom";
import MEDitor from '@uiw/react-md-editor';

\`\`\`
`;

export const CreatePostForm = () => {
  const [createPost, { isLoading }] = useCreatePostMutation(); // Create user

  // Create form
  const form = useForm<IPostCreate>({
    // resolver: zodResolver(createPostSchema),
    defaultValues: { title: 'Test post #1', body: mkdStr },
  });

  const handleCreate = async (values: IPostCreate) => {
    createPost(values);
  };

  return (
    <Card>
      <CardHeader className="flex gap-2">
        <CardTitle>
          <span>Add a new post</span>
          {isLoading && <Spinner />}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-3">
            <FormField
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Post title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <MDEditor height={600} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Create New</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
