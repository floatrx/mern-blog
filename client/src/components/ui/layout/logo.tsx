import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

import { SITE_NAME } from '@/config/const';
import { cn } from '@/lib/utils';

interface IProps {
  className?: string;
}

export const Logo = ({ className }: IProps) => (
  <Link to="/" className={cn('flex items-center gap-1 text-2xl font-bold', className)}>
    <Leaf />
    <span>{SITE_NAME}</span>
  </Link>
);
