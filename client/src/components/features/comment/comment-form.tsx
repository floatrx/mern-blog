import { MessageSquarePlus, QuoteIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { usePostCommentMutation } from '@/api/comments';
import { useToast } from '@/hooks/use-toast';
import { createCommentSchema } from '@/validators/comment';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { z } from 'zod';

import { Button } from '@/components/ui/button/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form/form';
import { Textarea } from '@/components/ui/textarea';

import type { ICommentCreateRequest, ICommentWithoutPost } from '@/types/comment';

interface IProps {
  postId: string;
  selectedComment: ICommentWithoutPost | null;
  parent?: string;
}

export const CommentForm = ({ postId, selectedComment }: IProps) => {
  const { toast } = useToast();

  const [createComment, { isLoading }] = usePostCommentMutation();

  const form = useForm<z.infer<typeof createCommentSchema>>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: { text: '' },
  });

  // Submit on cmd+enter
  const handleKeydown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      form.handleSubmit(handleSubmit)();
    }
  };

  const handleSubmit = async (values: z.infer<typeof createCommentSchema>) => {
    try {
      const payload = {
        ...values,
        post: postId,
        thread: selectedComment ? selectedComment.id : undefined,
      } satisfies ICommentCreateRequest;

      // Send request
      await createComment(payload);

      form.reset();
    } catch (e) {
      toast({ title: 'Comment creation failed', variant: 'destructive' });
    }
  };

  return (
    <motion.div layout transition={{ type: 'tween', duration: 0.1 }}>
      <div className="my-4 stack border-t-2 border-dashed pt-5">
        <MessageSquarePlus />
        {selectedComment ? 'Reply in thread' : 'Leave new comment'}:
      </div>
      {selectedComment && (
        <motion.div
          key={selectedComment?.id}
          className="my-2 grid grid-cols-[30px,1fr] will-change-transform items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <QuoteIcon className="opacity-30" size={14} />
          <p className="not-prose truncate pr-4">{selectedComment.text}</p>
        </motion.div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full space-y-3">
          <FormField
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    onKeyDown={handleKeydown}
                    id="comment-form"
                    className="text-xl"
                    placeholder="Type your comment here..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="stack justify-between">
            <Button type="submit" variant="outline" size="lg" loading={isLoading}>
              {selectedComment ? 'Reply' : 'Post'} Comment
            </Button>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xl">⌘</span> + <small>Enter</small>
            </kbd>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};
