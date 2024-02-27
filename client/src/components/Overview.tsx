import { Badge } from '@/components/ui/Badge';
import { RefetchButton } from '@/components/ui/button/RefetchButton';
import { PostCardItem } from '@/components/features/post/PostCardItem';
import { useDeletePostMutation, useSearchPostsQuery } from '@/api/posts';

export const Overview = () => {
  const { data: posts, isLoading, isError, refetch } = useSearchPostsQuery();
  const [deletePost] = useDeletePostMutation();

  return (
    <>
      <h1 className="mb-2 flex items-center gap-2 text-2xl">
        Posts <Badge variant="outline">{posts?.length || 0}</Badge> <RefetchButton onClick={refetch} />
      </h1>

      {isLoading && <p>Loading...</p>}

      {isError && <p>Error loading posts</p>}

      {posts && (
        <div className="grid-auto grid gap-2">
          {posts.map((post) => (
            <PostCardItem key={post.id} post={post} onDelete={deletePost} />
          ))}
        </div>
      )}
    </>
  );
};
