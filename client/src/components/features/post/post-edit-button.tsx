import { Button } from '@/components/ui/button/button';
import { Link } from 'react-router-dom';
import { Pencil } from 'lucide-react';

import { onlyAuth } from '@/components/hoc/only-auth';

export const PostEditButton = onlyAuth((props: { id: string }) => (
  <Link to={`/posts/${props.id}/edit`}>
    <Button size="icon" variant="ghost">
      <Pencil />
    </Button>
  </Link>
));
