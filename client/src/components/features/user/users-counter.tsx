import { Badge, type BadgeProps } from '@/components/ui/badge';
import { useSearchUsersQuery } from '@/api/users';

interface IProps extends Pick<BadgeProps, 'variant'> {}

export const UsersCounter = ({ variant = 'outline' }: IProps) => {
  const { data: users = [] } = useSearchUsersQuery(); // Fetch users
  return <Badge variant={variant}>{users?.length}</Badge>;
};
