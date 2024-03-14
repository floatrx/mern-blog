import { Calendar, CircleUserRound } from 'lucide-react';

import type { IPost } from '@/types/post';

export const PostMeta = ({ post }: { post: IPost }) => (
  <div className="stack flex-wrap gap-2 gap-y-0 text-muted-foreground text-nowrap text-sm sm:text-lg">
    <span className="flex sm:inline-flex items-center gap-2">
      <CircleUserRound size={18} /> {post.author.name}
    </span>
    <span className="hidden sm:inline-block">{'•'}</span>
    <span className="flex sm:inline-flex items-center gap-2">
      <Calendar size={18} /> {new Date(post.createdAt).toLocaleString()}
    </span>
  </div>
);
