import { Menu } from 'lucide-react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import type { MainNavItem } from '@/config/nav';
import { useToggle } from '@/hooks/use-toggle';
import { useMediaQuery } from 'usehooks-ts';

import { UserProfileButton } from '@/components/features/user/user-profile-button';

import { Button } from '@/components/ui/button/button';
import { Logo } from '@/components/ui/layout/logo';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface IProps {
  items: MainNavItem[];
}

export function MobileNav({ items }: IProps) {
  const { isOpen, setOpen, close } = useToggle();
  const smallScreen = useMediaQuery('(max-width: 767px)'); // auto-close on desktop

  return (
    <Sheet open={isOpen && smallScreen} onOpenChange={setOpen} modal>
      <SheetTrigger asChild>
        <Button variant="ghost" className="!bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
          <Menu />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <div onClick={close}>
          <Logo className="gap-3 text-2xl" />
        </div>
        <ScrollArea className="h-full">
          <div className="mt-6 min-h-[calc(100vh-200px)] space-y-7">
            <hr />
            <h4 className="font-medium opacity-40">Menu:</h4>
            {items.map(({ Icon, to, label }, idx) => (
              <Fragment key={idx}>
                <Link to={to} onClick={close} className="stack gap-3 text-2xl [&>svg]:opacity-40">
                  <Icon /> {label}
                </Link>
              </Fragment>
            ))}
          </div>
          <hr className="py-2" />
          <UserProfileButton className="w-full" />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
