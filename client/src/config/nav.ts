import { Hash, SquarePen, UsersRound } from 'lucide-react';

import { PostsCounter } from '@/components/features/post/posts-counter';
import { TagsCounter } from '@/components/features/tag/tags-counter';
import { UsersCounter } from '@/components/features/user/users-counter';

export type MainNavItem = {
  // path to navigate
  to: string;
  // label to display
  label: string;
  // Icon component (as a React component)
  Icon: React.FC;
  // Counter component (as a React component)
  Counter: React.FC;
  // Mark route as private (only for authenticated users)
  private: boolean;
};

export const mainNavItems: MainNavItem[] = [
  { to: '/users', label: 'Users', Icon: UsersRound, Counter: UsersCounter, private: true },
  { to: '/tags', label: 'Tags', Icon: Hash, Counter: TagsCounter, private: true },
  { to: '/posts/create', label: 'Post', Icon: SquarePen, Counter: PostsCounter, private: true },
];
