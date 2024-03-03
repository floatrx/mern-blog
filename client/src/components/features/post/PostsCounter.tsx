import { Badge, type BadgeProps } from '@/components/ui/Badge';
import { useSearchPostsQuery } from '@/api/posts';

interface IProps extends Pick<BadgeProps, 'variant'> {}

export const PostsCounter = ({ variant = 'outline' }: IProps) => {
  const { data: posts = [] } = useSearchPostsQuery({}); // Fetch posts
  return <Badge variant={variant}>{posts?.length}</Badge>;
};
