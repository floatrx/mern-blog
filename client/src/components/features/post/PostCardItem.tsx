import type { IPost } from '@/types/post';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Link } from 'react-router-dom';
import { PostDeleteButton } from '@/components/features/post/PostDeleteButton';
import { PostEditButton } from '@/components/features/post/PostEditButton';
import { RichText } from '@/components/ui/RichText';
import { TagsList } from '@/components/features/tag/TagsList';

export const PostCardItem = ({ post }: { post: IPost }) => (
  <Card>
    <CardHeader>
      <div className="">
        <Link to={`/posts/${post.id}`} className="text-blue-500">
          {post.thumbnail && <img src={post.thumbnail} alt="post" className="mb-2 h-52 w-full rounded-xl object-cover" />}
          <h2 className="text-2xl">{post.title}</h2>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">{post.author.name}</span>
        <PostDeleteButton id={post.id} />
        <PostEditButton id={post.id} />
      </div>
    </CardHeader>
    <CardContent>
      <RichText content={post.body} excerpt />
      <TagsList tags={post.tags} />
    </CardContent>
  </Card>
);
