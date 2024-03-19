import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { mobileNavVariants } from '@/config/animations';
import type { MainNavItem } from '@/config/nav';
import { useToggle } from '@/hooks/use-toggle';
import { AnimatePresence, type PanInfo, motion } from 'framer-motion';
import { useMediaQuery } from 'usehooks-ts';

import { UserProfileButton } from '@/components/features/user/user-profile-button';

import { Backdrop } from '@/components/ui/backdrop';
import { BurgerButton } from '@/components/ui/button/burgerButton';
import { Logo } from '@/components/ui/layout/logo';

interface IProps {
  items: MainNavItem[];
}

/**
 * Mobile navigation with animation
 * @param items
 * @constructor
 */
export function MobileNav({ items }: IProps) {
  const { isOpen, toggleOpen, close } = useToggle();
  const [isDisabled, setIsDisabled] = useState<boolean | void>();
  const smallScreen = useMediaQuery('(max-width: 767px)'); // auto-close on desktop

  /**
   * Some exceptions during the animation and clicking the button
   * When the animation is in progress, the button should be disabled
   * onExitComplete -> unlock the button after the animation is finished
   */
  const handleSafeToggle = useCallback(() => {
    isOpen && setIsDisabled(true);
    toggleOpen();
  }, [isOpen, toggleOpen]);

  /**
   * Swipe right to close
   */
  const handleDismiss = useCallback(
    (_e: MouseEvent, panInfo: PanInfo) => {
      if (!panInfo) return;
      panInfo?.offset?.x > 100 && setTimeout(close, 100); // timeout to prevent exception
    },
    [close],
  );

  /**
   * Close on resize
   */
  useEffect(() => {
    if (!smallScreen) close();
  }, [close, smallScreen]);

  return (
    <div>
      <BurgerButton disabled={isDisabled} onClick={handleSafeToggle} isOpen={isOpen} />
      <AnimatePresence mode="wait" initial={false} onExitComplete={setIsDisabled}>
        {isOpen && (
          <motion.div>
            <Backdrop onDismiss={close} />
            <motion.div
              variants={mobileNavVariants.wrapper}
              initial="closed"
              animate="open"
              exit="exit"
              className="fixed top-0 right-0 bg-background p-10 h-screen min-w-[300px]"
              // [ux/experiment] Swipe right to close ->
              drag="x"
              onDragEnd={handleDismiss}
            >
              <div>
                <Logo className="gap-3 text-2xl" animate={false} />
                <div className="mt-6 min-h-[calc(100vh-200px)] space-y-7">
                  <hr />
                  <h4 className="font-medium opacity-40">Menu:</h4>
                  <motion.nav className="list-none" variants={mobileNavVariants.nav}>
                    {items.map(({ Icon, to, label }, idx) => (
                      <motion.li key={idx} variants={mobileNavVariants.item}>
                        <Link onClick={close} to={to} className="stack gap-3 text-2xl [&>svg]:opacity-40 py-2">
                          <Icon /> {label}
                        </Link>
                      </motion.li>
                    ))}
                  </motion.nav>
                </div>
                <hr className="py-2" />
                <UserProfileButton className="w-full" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
