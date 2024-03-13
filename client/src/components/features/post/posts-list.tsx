import { useSearchPostsQuery } from '@/api/posts';
import { DataRenderer } from '@/components/hoc/data-renderer';
import { useDebounceCallback, useDebounceValue } from 'usehooks-ts';

import { PostPreviewCard } from '@/components/features/post/post-preview-card';

import { Input } from '@/components/ui/form/input';

export const PostsList = () => {
  const [title, setValue] = useDebounceValue('', 500);
  const postsQuery = useSearchPostsQuery({ title });

  const handleChange = useDebounceCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, 10);

  return (
    <>
      <Input className="max-w-[400px]" onChange={handleChange} placeholder="Search by title..." />
      <DataRenderer className="grid-auto" {...postsQuery} render={(post) => <PostPreviewCard key={post.id} post={post} />} />
    </>
  );
};
