import { useParams } from 'react-router';
import { useGetPostQuery } from '@/api/posts';

export const PostSinglePage = () => {
  const { id } = useParams();
  const { data: post, isFetching } = useGetPostQuery(id, { skip: !id });

  if (!id) return <div>No ID provided</div>;

  if (isFetching) return <div>Loading...</div>;

  if (!post) {
    return <div>Post {id} not found!</div>;
  }

  return (
    <div>
      <h1>PostSinglePage</h1>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </div>
  );
};
