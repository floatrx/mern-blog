import { Link } from 'react-router-dom';

import { mainNavItems } from '@/config/nav';
import { useAppSelector } from '@/hooks/redux';
import { cn } from '@/lib/utils';
import { selectIsLoggedIn } from '@/store/auth';

import { UserProfileButton } from '@/components/features/user/user-profile-button';

import { Logo } from '@/components/ui/layout/logo';
import { MobileNav } from '@/components/ui/mobile-nav';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export const Header = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <header className="top-0 z-40 w-full bg-background/80 p-1 shadow backdrop-blur">
      <div className="container flex h-16 items-center space-x-4 sm:space-x-0">
        <Logo />

        <nav className="flex-auto">
          <ul className="stack gap-4">
            <li className="flex-1" />
            {mainNavItems.map(({ Icon, Counter, ...item }, idx) => (
              <li key={idx} className={cn(!item.to && 'flex-1', 'hidden md:block' /* show only sm & larger screens */)}>
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
            <li>
              <ThemeToggle />
            </li>
            <li className={cn(isLoggedIn && 'hidden md:block')}>
              <UserProfileButton asDropdown />
            </li>
          </ul>
        </nav>

        {isLoggedIn && <MobileNav items={mainNavItems} />}
      </div>
    </header>
  );
};
