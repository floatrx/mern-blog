import { PostsListWithPreview } from '@/components/features/post/posts-list-with-preview';

import { Heading } from '@/components/ui/heading';

export const Overview = () => (
  <div className="flex flex-col space-y-4">
    <Heading text="Latest posts" />
    <PostsListWithPreview />
  </div>
);

export default Overview;
