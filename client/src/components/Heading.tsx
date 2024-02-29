import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

interface HeadingProps {
  text: string | React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  count?: number;
}

export const Heading = ({ level = 2, text, children, actions, count }: HeadingProps) => {
  const HeadingTag = `h${level}` as React.ElementType;
  const variants = {
    1: 'text-4xl',
    2: 'text-3xl',
    3: 'text-2xl',
    4: 'text-xl',
    5: 'text-lg',
    6: 'text-base',
  };
  return (
    <HeadingTag className={cn(variants[level], 'flex items-center gap-2 ')}>
      {text}
      {count && <Badge variant="outline">{count}</Badge>}
      {actions && <div className="flex gap-2">{actions}</div>}
      {children}
    </HeadingTag>
  );
};
