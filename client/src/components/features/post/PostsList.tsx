import { DataBoundary } from '@/components/DataBoundary';
import { PostCardItem } from '@/components/features/post/PostCardItem';
import { useSearchPostsQuery } from '@/api/posts';
import { useDebounceCallback, useDebounceValue } from 'usehooks-ts';
import { Input } from '@/components/ui/form/Input';

export const PostsList = () => {
  const [title, setValue] = useDebounceValue('', 500);
  const postsQuery = useSearchPostsQuery({ title });

  const handleChange = useDebounceCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, 10);

  return (
    <>
      <Input className="max-w-[400px]" onChange={handleChange} placeholder="Search post by title..." />
      <DataBoundary className="grid-auto" {...postsQuery} render={(post) => <PostCardItem key={post.id} post={post} />} />
    </>
  );
};
