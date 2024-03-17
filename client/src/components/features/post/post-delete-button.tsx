import { Trash2 } from 'lucide-react';

import { useDeletePostMutation } from '@/api/posts';
import { onlyAuth } from '@/components/hoc/only-auth';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button/button';

interface IProps {
  id: string;
  onDelete?: () => void;
}

export const PostDeleteButton = onlyAuth<IProps>(({ id, onDelete }) => {
  const { toast } = useToast();
  const [deletePost] = useDeletePostMutation();

  const handleDelete = async () => {
    try {
      await deletePost(id);
      onDelete?.();
      toast({ title: `Post ${id} deleted` });
    } catch (e) {
      console.error('Error deleting post:', e.message);
      toast({ title: 'Error', description: e.error.message, variant: 'destructive' });
    }
  };

  return (
    <Button size="icon" variant="ghost" onClick={handleDelete}>
      <Trash2 />
    </Button>
  );
});
