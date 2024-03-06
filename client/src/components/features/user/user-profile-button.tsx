import { Link } from 'react-router-dom';
import { CircleUserRound, LogIn } from 'lucide-react';
import { UserLogoutButton } from '@/components/features/user/user-logout-button';
import { cn } from '@/lib/utils';
import { selectUser } from '@/store/auth';
import { useAppSelector } from '@/hooks/redux';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export const UserProfileButton = (props: { className?: string }) => {
  const user = useAppSelector(selectUser);
  const classNames = cn(`flex items-center gap-2 text-nowrap`, props.className);

  if (!user.id) {
    return (
      <Link to="/login" className={cn(classNames, 'px-3 py-2')}>
        <LogIn /> Login
      </Link>
    );
  }

  const name = user.name.split(' ');
  const displayName = name.length > 1 ? `${name[0]} ${name[1][0]}.` : user.name;

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="outline-0">
          <Link to="/profile" className={cn(classNames)}>
            <CircleUserRound />
            <span className="font-semibold">{displayName}</span>
          </Link>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="p-10 hover:bg-card">
          <DropdownMenuItem className="!bg-transparent text-center">
            <div className="space-y-1">
              <CircleUserRound size={60} className="mx-auto mb-4" />
              <Link className="text-xl font-semibold" to="/profile">
                {user.name}
              </Link>
              <div className="!mb-4 text-muted-foreground">{user.email}</div>
              <UserLogoutButton className="w-full" />
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
