import { UserList } from '@/components/features/user/UserList';
import { Heading } from '@/components/Heading';
import { PostsList } from '@/components/features/post/PostsList';

export const Overview = () => {
  return (
    <div className="flex flex-col space-y-4">
      <Heading text="Users" />
      <UserList />

      <Heading text="Posts" />
      <PostsList />
    </div>
  );
};
