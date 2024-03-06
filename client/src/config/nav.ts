import { Hash, SquarePen, UsersRound } from 'lucide-react';
import { UsersCounter } from '@/components/features/user/users-counter';
import { TagsCounter } from '@/components/features/tag/tags-counter';
import { PostsCounter } from '@/components/features/post/posts-counter';

export type MainNavItem = Partial<{
  to: string;
  label: string;
  Icon: React.FC;
  Counter: React.FC;
  private: boolean;
  type: 'divider';
}>;

export const mainNavItems: MainNavItem[] = [
  { type: 'divider' },
  { to: '/users', label: 'Users', Icon: UsersRound, Counter: UsersCounter, private: true },
  { to: '/tags', label: 'Tags', Icon: Hash, Counter: TagsCounter, private: true },
  { to: '/posts/create', label: 'Post', Icon: SquarePen, Counter: PostsCounter, private: true },
  { type: 'divider' },
];
