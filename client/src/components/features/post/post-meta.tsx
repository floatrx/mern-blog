import { Calendar, CircleUserRound } from 'lucide-react';

import type { IPost } from '@/types/post';

export const PostMeta = ({ post }: { post: IPost }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-muted-foreground text-nowrap">
    <span className="flex sm:inline-flex items-center gap-2">
      <CircleUserRound size={18} /> {post.author.name}
    </span>
    <span className="hidden sm:inline-block">{'•'}</span>
    <span className="flex sm:inline-flex items-center gap-2">
      <Calendar size={18} /> {new Date(post.createdAt).toLocaleString()}
    </span>
  </div>
);
