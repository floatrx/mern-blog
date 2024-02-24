import { useAppDispatch } from '@/hooks/redux';
import { logout } from '@/store/auth';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface IProps {
  circle?: boolean;
}

export const UserLogoutButton = ({ circle }: IProps) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Button onClick={handleLogout} className="flex gap-2" variant="outline" size={circle ? 'icon' : 'default'}>
      {circle ? '' : 'Logout'} <LogOut className="h-[1.2rem] w-[1.2rem]" />
    </Button>
  );
};
