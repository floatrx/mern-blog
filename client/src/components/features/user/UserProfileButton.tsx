import { useAppSelector } from '@/hooks/redux';
import { selectUser } from '@/store/auth';
import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { UserLogoutButton } from '@/components/features/user/UserLogoutButton';

export const UserProfileButton = () => {
  const user = useAppSelector(selectUser);

  if (!user.id) {
    return (
      <Link to="/login" className="flex items-center gap-2 px-3 py-2">
        <LogIn /> Login
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link to="/profile" className="flex items-center gap-2">
        {user.name}
      </Link>
      <UserLogoutButton circle />
    </div>
  );
};
