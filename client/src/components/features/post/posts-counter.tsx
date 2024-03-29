import { useSearchPostsQuery } from '@/api/posts';

import { Badge, type BadgeProps } from '@/components/ui/badge';

interface IProps extends Pick<BadgeProps, 'variant'> {}

export const PostsCounter = ({ variant = 'outline' }: IProps) => {
  const { data: posts = [] } = useSearchPostsQuery({}); // Fetch posts
  return <Badge variant={variant}>{posts?.length}</Badge>;
};
