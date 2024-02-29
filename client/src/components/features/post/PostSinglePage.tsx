import { PostEditButton } from '@/components/features/post/PostEditButton';
import { RichText } from '@/components/features/post/RichText';
import { useGetPostQuery } from '@/api/posts';
import { useParams } from 'react-router';

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
      {post.thumbnail && <img className="h-full rounded-xl" src={post.thumbnail} alt={post.title} />}
      <div className="mb-10 flex items-center gap-2">
        <span className="text-muted-foreground">
          {post.author.name} • {post.author.email}
        </span>
        <PostEditButton id={post.id} />
      </div>
      <h1>{post.title}</h1>
      <RichText content={post.body} />
    </div>
  );
};
