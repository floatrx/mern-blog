import { CreateUserDialog } from '@/components/features/user/create-user-dialog';
import { Heading } from '@/components/ui/heading';
import { UserList } from '@/components/features/user/user-list';

export const UsersSearchPage = () => (
  <div>
    <Heading text="Users" actions={<CreateUserDialog />} />
    <UserList />
  </div>
);

export default UsersSearchPage;
