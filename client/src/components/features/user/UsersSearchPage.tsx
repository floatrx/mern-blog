import { CreateUserDialog } from '@/components/features/user/CreateUserDialog';
import { Heading } from '@/components/ui/Heading';
import { UserList } from '@/components/features/user/UserList';

export const UsersSearchPage = () => (
  <div>
    <Heading text="Users" actions={<CreateUserDialog />} />
    <UserList />
  </div>
);
