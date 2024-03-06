import { DataRenderer } from '@/components/hoc/data-renderer';
import { PostCard } from '@/components/features/post/post-card';
import { useSearchPostsQuery } from '@/api/posts';
import { useDebounceCallback, useDebounceValue } from 'usehooks-ts';
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
      <DataRenderer className="grid-auto" {...postsQuery} render={(post) => <PostCard key={post.id} post={post} />} />
    </>
  );
};
