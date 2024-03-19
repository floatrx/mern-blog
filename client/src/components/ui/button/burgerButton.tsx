import { type SVGMotionProps, motion } from 'framer-motion';

import { Button } from '@/components/ui/button/button';

interface IPathProps extends SVGMotionProps<any> {}

const Path = (props: IPathProps) => (
  <motion.path fill="transparent" strokeWidth="3" stroke="currentColor" strokeLinecap="round" {...props} />
);

/**
 * Animated burger button
 * TODO: Refactor, coz console.error ->
 *  framer-motion Error: <path> attribute d: Expected moveto path command ('M' or 'm')
 * @param onClick
 * @param active
 * @constructor
 */
export const BurgerButton = ({ onClick, isOpen, disabled }) => {
  return (
    <Button disabled={disabled} onClick={onClick} size="icon" variant="ghost" className="relative z-10 !bg-transparent md:hidden">
      <motion.svg width="23" height="23" viewBox="0 0 23 23" initial="closed" animate={isOpen ? 'open' : 'closed'}>
        <Path
          variants={{
            closed: { d: 'M 2 2.5 L 20 2.5' },
            open: { d: 'M 3 16.5 L 17 2.5' },
          }}
        />
        <Path d="M 2 9.423 L 20 9.423" variants={{ closed: {}, open: { scale: 0 } }} transition={{ duration: 0.1 }} />
        <Path
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346' },
            open: { d: 'M 3 2.5 L 17 16.346' },
          }}
        />
      </motion.svg>
    </Button>
  );
};
