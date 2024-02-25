import { useParams } from 'react-router';
import { useGetPostQuery } from '@/api/posts';
import MarkdownEditor from '@uiw/react-markdown-editor';

export const PostSinglePage = () => {
  const { id } = useParams();
  const { data: post, isFetching } = useGetPostQuery(id, { skip: !id });

  if (!id) return <div>No ID provided</div>;

  if (isFetching) return <div>Loading...</div>;

  if (!post) {
    return <div>Post {id} not found!</div>;
  }

  return (
    <div className="prose lg:prose-xl dark:prose-invert">
      <h1>{post.title}</h1>
      <MarkdownEditor.Markdown source={post.body} />

      <pre>{JSON.stringify(post, null, 2)}</pre>
    </div>
  );
};
