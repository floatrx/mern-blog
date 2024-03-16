import type { Variants } from 'framer-motion';

export const openSpring = { type: 'spring', stiffness: 200, damping: 30 };
export const closeSpring = { type: 'spring', stiffness: 300, damping: 35 };

export const popUpAnimation: Variants = {
  // From
  initial: {
    translateY: -20,
    opacity: 0,
  },
  // To
  animate: {
    translateY: 0,
    opacity: 1,
    transition: {
      delay: 0.2,
    },
  },
};

export const popDownVariants: { wrapper: Variants; item: Variants } = {
  wrapper: {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.08,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 50,
      },
    },
  },
};

export const popUpVariants: { wrapper: Variants; item: Variants } = {
  wrapper: {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.08,
        when: 'beforeChildren',
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30,
        mass: 0.5,
        when: 'beforeChildren',
      },
    },
  },
};

export const slideVariants: { wrapper: Variants; item: Variants } = {
  wrapper: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.03,
      },
    },
  },
  item: {
    hidden: { opacity: 0, x: -5 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 50,
      },
    },
  },
};
