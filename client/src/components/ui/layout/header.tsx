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
            {mainNavItems.map(({ Icon, Counter, ...item }, idx) => (
              <li key={idx} className={cn(!item.to && 'flex-1', 'hidden sm:block' /* show only sm & larger screens */)}>
                {item.to && (!item.private || (item.private && isLoggedIn)) && (
                  <Link to={item.to} className="stack">
                    {Icon && <Icon />} <span className="text-nowrap">{item.label}</span>
                    <span className="text-nowrap">{Counter && <Counter />}</span>
                  </Link>
                )}
              </li>
            ))}
            <li className="hidden md:block">
              <ThemeToggle />
            </li>
            <li className="hidden md:block">
              <UserProfileButton />
            </li>
          </ul>
        </nav>

        <MobileNav items={mainNavItems} />
      </div>
    </header>
  );
};
