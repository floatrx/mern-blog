import { useParams } from 'react-router';
import { MarkdownEditor } from '@/components/editor/MarkdownEditor';
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
    <div className="prose dark:prose-invert lg:prose-xl">
      {post.thumbnail && <img className="h-96 rounded-xl" src={post.thumbnail} alt={post.title} />}
      <h1>{post.title}</h1>
      <MarkdownEditor value={post.body} readOnly mode="view" />
    </div>
  );
};
