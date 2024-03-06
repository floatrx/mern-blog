import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { SITE_NAME } from '@/config/const';

export const Logo = () => (
  <span className="text-md sm:text-2xl">
    <Link to="/" className="flex items-center gap-1 font-bold">
      <Leaf />
      <span>{SITE_NAME}</span>
    </Link>
  </span>
);
