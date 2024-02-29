import { DataBoundary } from '@/components/DataBoundary';
import { UserCardItem } from '@/components/features/user/UserCardItem';
import { useSearchUsersQuery } from '@/api/users';

export const UserList = () => (
  <DataBoundary className="grid-auto" {...useSearchUsersQuery()} render={(user) => <UserCardItem key={user.id} user={user} />} />
);
