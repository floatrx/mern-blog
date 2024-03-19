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
    exit: {
      opacity: 0,
    },
  },
  item: {
    hidden: { opacity: 0, x: -15 },
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

// Navigation
export const mobileNavVariants: Record<'wrapper' | 'nav' | 'item', Variants> = {
  wrapper: {
    closed: {
      x: 'calc(100% + 100px)', // +100px for MobileNavCurveEffect
      // clipPath: 'circle(25px at 81% 3.4%)',
      transition: { duration: 0.3 },
    },
    open: {
      x: '0',
      // clipPath: 'circle(150% at 100% 0%)',
      transition: { duration: 0.4, when: 'beforeChildren' },
    },
    exit: {
      x: 'calc(100% + 100px)',
      // clipPath: 'circle(25px at 81% 3.4%)',
      transition: { duration: 0.2 },
    },
  },
  nav: {
    closed: { x: -50, opacity: 0 },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        when: 'beforeChildren',
        duration: 0.3,
      },
    },
    exit: {
      x: -80,
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.1,
      },
    },
  },
  item: {
    closed: { scale: 0, opacity: 0 },
    open: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
  },
};
