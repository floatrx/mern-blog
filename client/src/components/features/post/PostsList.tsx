import { PostCardItem } from '@/components/features/post/PostCardItem';
import { useSearchPostsQuery } from '@/api/posts';
import { Spinner } from '@/components/ui/Spinner';

export const PostsList = () => {
  const { data: posts, isLoading, isFetching, error, isError } = useSearchPostsQuery();

  if (isLoading || isFetching) return <Spinner spinning />;

  if (error) return <div className="p-2">An error has occurred: {JSON.stringify(error)}</div>;

  return (
    <>
      {isLoading && <p>Loading...</p>}

      {isError && <p>Error loading posts</p>}

      <div className="grid-auto">{posts?.map((post) => <PostCardItem key={post.id} post={post} />)}</div>
    </>
  );
};
