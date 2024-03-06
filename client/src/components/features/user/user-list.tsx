import { DataRenderer } from '@/components/hoc/data-renderer';
import { UserCardItem } from '@/components/features/user/user-card-item';
import { useSearchUsersQuery } from '@/api/users';

export const UserList = () => (
  <DataRenderer className="grid-auto" {...useSearchUsersQuery()} render={(user) => <UserCardItem key={user.id} user={user} />} />
);
