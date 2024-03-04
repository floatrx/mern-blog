import { PostEditButton } from '@/components/features/post/PostEditButton';
import { RichText } from '@/components/ui/RichText';
import { useGetPostQuery } from '@/api/posts';
import { useParams } from 'react-router';
import { TagsList } from '@/components/features/tag/TagsList';
import { TogglePostTagsDropdownMenu } from '@/components/features/tag/TogglePostTagsDropdownMenu';

export const PostSinglePage = () => {
  const { id } = useParams();
  const { data: post } = useGetPostQuery(id, { skip: !id });

  if (!id) return <div>No ID provided</div>;

  if (!post) {
    return <div>Post {id} not found!</div>;
  }

  return (
    <div className="prose dark:prose-invert lg:prose-xl">
      {post.thumbnail && <img className="h-full rounded-xl" src={post.thumbnail} alt={post.title} />}
      <div className="mb-10 flex items-center gap-2">
        <span className="text-muted-foreground">@{post.author.name}</span>
        <PostEditButton id={post.id} />
        <TogglePostTagsDropdownMenu post={post} />
      </div>
      <TagsList tags={post.tags} />
      <h1>{post.title}</h1>
      <RichText content={post.body} />
    </div>
  );
};
