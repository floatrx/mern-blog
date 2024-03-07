import type { IPost } from '@/types/post';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { TagsList } from '@/components/features/tag/tags-list';
import { Content } from '@/components/ui/content';
import { PostMeta } from '@/components/features/post/post-meta';

export const PostCard = ({ post }: { post: IPost }) => (
  <Card className="mt-10">
    <CardHeader className="space-y-4">
      <Link to={`/posts/${post.id}`} className="space-y-5 text-blue-500">
        {post.thumbnail && (
          <img src={post.thumbnail} alt="post" className="-mt-14 mb-2 h-52 w-full rounded-xl object-cover shadow-xl shadow-cyan-500/5" />
        )}
        <h2 className="line-clamp-2 text-2xl">{post.title}</h2>
      </Link>
      <PostMeta post={post} />
    </CardHeader>
    <CardContent className="space-y-2">
      <TagsList tags={post.tags} />
      <Content text={post.body} />
    </CardContent>
  </Card>
);
