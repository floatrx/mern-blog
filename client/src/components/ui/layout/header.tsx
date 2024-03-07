import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/hooks/redux';
import { selectIsLoggedIn } from '@/store/auth';
import { UserProfileButton } from '@/components/features/user/user-profile-button';
import { MobileNav } from '@/components/ui/mobile-nav';
import { Logo } from '@/components/ui/layout/logo';
import { mainNavItems } from '@/config/nav';

export const Header = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <header className="top-0 z-40 w-full bg-card p-1 shadow">
      <div className="container flex h-16 items-center space-x-4 sm:space-x-0">
        <Logo />

        <nav className="flex-auto">
          <ul className="stack gap-4">
            <li className="flex-1" />
            {mainNavItems.map(({ Icon, Counter, ...item }, idx) => (
              <li key={idx} className={cn(!item.to && 'flex-1', 'hidden sm:block' /* show only sm & larger screens */)}>
                {(!item.private || (item.private && isLoggedIn)) && (
                  <Link to={item.to} className="stack">
                    <Icon /> <span className="text-nowrap">{item.label}</span>
                    <span className="text-nowrap">
                      <Counter />
                    </span>
                  </Link>
                )}
              </li>
            ))}
            <li className="flex-1" />
            <li className={cn(isLoggedIn && 'hidden md:block')}>
              <ThemeToggle />
            </li>
            <li className={cn(isLoggedIn && 'hidden lg:block')}>
              <UserProfileButton />
            </li>
          </ul>
        </nav>

        {isLoggedIn && <MobileNav items={mainNavItems} />}
      </div>
    </header>
  );
};
