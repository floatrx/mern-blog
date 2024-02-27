import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button/Button';
import { Trash2 } from 'lucide-react';
import type { IPost } from '@/types/post';

interface IProps {
  post: IPost;
  onDelete?: (id: string) => void;
}
export const PostCardItem = ({ post, onDelete }: IProps) => (
  <Card>
    <CardHeader>
      <div className="">
        <Link to={`/posts/${post.id}`} className="text-blue-500">
          {post.thumbnail && <img src={post.thumbnail} alt="post" className="mb-2 h-52 w-full rounded-xl object-cover" />}
          <h2 className="text-2xl">{post.title}</h2>
        </Link>
      </div>
      <div className="text-muted-foreground">
        {post.author.name} • {post.author.email}
      </div>
    </CardHeader>
    <CardContent>
      <p className="line-clamp-4">{post.body}</p>
    </CardContent>
    <CardFooter>
      <Button size="icon" className="size-8 p-2" variant="outline" onClick={() => onDelete?.(post.id)}>
        <Trash2 size={20} />
      </Button>
    </CardFooter>
  </Card>
);
