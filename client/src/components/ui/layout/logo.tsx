import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

import { SITE_NAME } from '@/config/const';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface IProps {
  className?: string;
}

export const Logo = ({ className }: IProps) => (
  <Link to="/" className={cn('text-xl sm:text-2xl font-bold', className)}>
    <motion.span className="flex items-center gap-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 1 }}>
      <motion.span
        initial={{ opacity: 0, rotate: 15, scale: 0.8 }}
        animate={{ opacity: 1, rotate: 0, scale: 1.1, transition: { type: 'spring', stiffness: 260, damping: 20, delay: 0.1 } }}
      >
        <Leaf />
      </motion.span>
      <motion.span
        className="hidden xs:inline-flex"
        initial={{ x: -15, opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { type: 'spring', delay: 0.3 } }}
      >
        {SITE_NAME.split('').map((char, idx) => (
          <motion.span
            key={idx}
            className="inline-block"
            initial={{ x: 30, opacity: 0, scale: 2, rotate: Math.floor(Math.random() * (idx % 2 === 0 ? 50 : -50)) }}
            animate={{
              x: 0,
              opacity: 1,
              scale: 1,
              rotate: 0,
              transition: { type: 'spring', stiffness: 500, damping: 40, delay: 0.2 * idx },
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    </motion.span>
  </Link>
);
