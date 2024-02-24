import { useSearchUsersQuery } from '@/api/users';
import { Badge, type BadgeProps } from '@/components/ui/badge';

interface IProps extends Pick<BadgeProps, 'variant'> {}

export const UsersCounter = ({ variant = 'default' }: IProps) => {
  const { data: users = [] } = useSearchUsersQuery(); // Fetch users
  return <Badge variant={variant}>{users?.length}</Badge>;
};
