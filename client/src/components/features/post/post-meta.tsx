import { Calendar, CircleUserRound } from 'lucide-react';

import type { IPost } from '@/types/post';

export const PostMeta = ({ post }: { post: IPost }) => (
  <div className="flex items-center gap-2 text-muted-foreground">
    <CircleUserRound size={18} /> {post.author.name} {'•'} <Calendar size={18} /> {new Date(post.createdAt).toLocaleString()}
  </div>
);
