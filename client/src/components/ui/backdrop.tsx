import { motion } from 'framer-motion';

export const Backdrop = ({ onDismiss }: { onDismiss?: () => void }) => {
  return (
    <motion.div
      key="backdrop"
      className="fixed inset-0 bg-black/20 backdrop-blur-sm"
      onClick={onDismiss}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 35,
          mass: 0.5,
          delay: 0.1,
        },
      }}
      exit={{ opacity: 0 }}
    />
  );
};
