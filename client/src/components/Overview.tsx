import { Heading } from '@/components/ui/Heading';
import { PostsList } from '@/components/features/post/PostsList';
import { TagsManager } from '@/components/features/tag/TagManager';

export const Overview = () => {
  return (
    <div className="flex flex-col space-y-4">
      <Heading text="Tags" />
      <TagsManager />
      <hr />
      <Heading text="Posts" />
      <PostsList />
    </div>
  );
};
