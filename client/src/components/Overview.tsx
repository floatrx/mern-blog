import { Heading } from '@/components/ui/Heading';
import { PostsList } from '@/components/features/post/PostsList';
import { TagsList } from '@/components/features/tag/TagList';

export const Overview = () => {
  return (
    <div className="flex flex-col space-y-4">
      <Heading text="Tags" />
      <TagsList />

      <hr />

      <Heading text="Posts" />
      <PostsList />
    </div>
  );
};
