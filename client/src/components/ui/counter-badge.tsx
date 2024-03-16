import { AnimatePresence, motion } from 'framer-motion';

interface IProps {
  count: number | Array<any>;
}

/**
 * AnimatedCounterBadge component
 * @param count - number | array of items
 */
export const CounterBadge = ({ count }: IProps) => {
  const num = Array.isArray(count) ? count.length : count;
  return (
    <span className="stack justify-center overflow-hidden relative text-sm px-2 py-1 rounded-2xl bg-foreground/10 font-bold min-w-[32px] min-h-[32px]">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={num} // This is important to animate the change
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, bounce: 0.25, mass: 0.5, velocity: 0, duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {num}
        </motion.span>
        <span className="invisible lining-nums">{num}</span>
      </AnimatePresence>
    </span>
  );
};
