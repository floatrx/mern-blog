import { Trash } from 'lucide-react';

import { useDeleteCommentMutation } from '@/api/comments';
import { onlyAuth } from '@/components/hoc/only-auth';

import { Button } from '@/components/ui/button/button';

export const CommentDeleteButton = onlyAuth(({ id }: { id: string }) => {
  const [deleteComment, { isLoading }] = useDeleteCommentMutation();
  return (
    <Button variant="outline" size="icon" className="size-6 transition" onClick={() => deleteComment(id)} loading={isLoading}>
      <Trash size={14} />
    </Button>
  );
});
