import { Button } from '@/components/ui/button/button';
import { Trash2 } from 'lucide-react';
import { useDeletePostMutation } from '@/api/posts';
import { useToast } from '@/hooks/use-toast';

import { onlyAuth } from '@/components/hoc/only-auth';

export const PostDeleteButton = onlyAuth((props: { id: string }) => {
  const { toast } = useToast();
  const [deletePost] = useDeletePostMutation();

  const handleDelete = async () => {
    try {
      await deletePost(props.id);
      toast({ title: `Post ${props.id} deleted` });
    } catch (e) {
      console.error('Error deleting post:', e.message);
      toast({ title: 'Error', description: e.error.message, variant: 'destructive' });
    }
  };

  return (
    <Button size="icon" className="size-8 p-2" variant="outline" onClick={handleDelete}>
      <Trash2 size={20} />
    </Button>
  );
});
