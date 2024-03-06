import { Button } from '@/components/ui/button/button';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/ui/layout/logo';
import { Menu } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { UserProfileButton } from '@/components/features/user/user-profile-button';
import { useFlag } from '@/hooks/use-flag';
import type { MainNavItem } from '@/config/nav';

interface IProps {
  items: MainNavItem[];
}

export function MobileNav({ items }: IProps) {
  const [open, toggleOpen, setOpen] = useFlag(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="!bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
          <Menu />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <div onClick={toggleOpen}>
          <Logo />
        </div>
        <ScrollArea className="h-full">
          <div className="mt-6 min-h-[calc(100vh-140px)] space-y-6">
            <h4 className="font-medium text-muted-foreground">Menu:</h4>
            {items.map(
              ({ Icon, to, label }) =>
                to && (
                  <Fragment key={to}>
                    <Link to={to} onClick={toggleOpen} className="stack text-xl">
                      {Icon && <Icon />} {label}
                    </Link>
                  </Fragment>
                ),
            )}
          </div>
          <UserProfileButton className="w-full" />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
