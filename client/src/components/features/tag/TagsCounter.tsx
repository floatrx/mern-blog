import { Badge, type BadgeProps } from '@/components/ui/Badge';
import { useSearchTagsQuery } from '@/api/tags';

interface IProps extends Pick<BadgeProps, 'variant'> {}

export const TagsCounter = ({ variant = 'outline' }: IProps) => {
  const { data } = useSearchTagsQuery({}); // Fetch tags
  return <Badge variant={variant}>{data?.length}</Badge>;
};
