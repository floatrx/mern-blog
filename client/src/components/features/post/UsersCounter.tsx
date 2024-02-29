import { useSearchPostsQuery } from '@/api/posts';
import { Badge, type BadgeProps } from '@/components/ui/Badge';

interface IProps extends Pick<BadgeProps, 'variant'> {}

export const PostsCounter = ({ variant = 'default' }: IProps) => {
  const { data: posts = [] } = useSearchPostsQuery(); // Fetch posts
  return <Badge variant={variant}>{posts?.length}</Badge>;
};
