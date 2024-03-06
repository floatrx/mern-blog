import { Heading } from '@/components/ui/heading';
import { PostsList } from '@/components/features/post/posts-list';

export const Overview = () => (
  <div className="flex flex-col space-y-4">
    <Heading text="Latest posts" />
    <PostsList />
  </div>
);

export default Overview;
