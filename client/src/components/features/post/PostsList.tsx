import { DataBoundary } from '@/components/DataBoundary';
import { PostCardItem } from '@/components/features/post/PostCardItem';
import { useSearchPostsQuery } from '@/api/posts';

export const PostsList = () => (
  <DataBoundary className="grid-auto" {...useSearchPostsQuery()} render={(post) => <PostCardItem key={post.id} post={post} />} />
);
