import { Button } from '@/components/ui/button/Button';
import { Link } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import { withAuth } from '@/components/hoc/withAuth';

export const PostEditButton = withAuth((props: { id: string }) => (
  <Link to={`/posts/${props.id}/edit`} className="flex">
    <Button size="icon" className="size-8 p-2" variant="outline">
      <Pencil />
    </Button>
  </Link>
));
