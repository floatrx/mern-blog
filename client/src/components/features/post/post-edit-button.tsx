import { Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';

import { onlyAuth } from '@/components/hoc/only-auth';

import { Button } from '@/components/ui/button/button';

export const PostEditButton = onlyAuth((props: { id: string }) => (
  <Link to={`/posts/${props.id}/edit`}>
    <Button size="icon" variant="ghost">
      <Pencil />
    </Button>
  </Link>
));
