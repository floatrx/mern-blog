import { useParams } from 'react-router';

import { useGetPostQuery } from '@/api/posts';

import { PostContent } from '@/components/features/post/post-content';

import { Spinner } from '@/components/ui/spinner';

export const PostSinglePage = () => {
  const { id } = useParams();
  const { data: post, isLoading, isError } = useGetPostQuery(id, { skip: !id });

  if (!id) return <div>No ID provided</div>;

  if (!post && isError) return <div>Post {id} not found!</div>;

  if (isLoading) return <Spinner spinning />;

  return <PostContent post={post} />;
};

export default PostSinglePage;
