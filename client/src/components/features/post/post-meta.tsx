import type { IPost } from '@/types/post';
import { Calendar, CircleUserRound } from 'lucide-react';

export const PostMeta = ({ post }: { post: IPost }) => (
  <div className="flex items-center gap-2 text-muted-foreground">
    Test
    <CircleUserRound size={18} /> {post.author.name} {'•'} <Calendar size={18} /> {new Date(post.createdAt).toLocaleString()}
  </div>
);
