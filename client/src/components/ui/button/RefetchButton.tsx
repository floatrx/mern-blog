import { Button } from '@/components/ui/button/Button';
import { RefreshCw } from 'lucide-react';

interface IProps {
  onClick: () => void;
}
export const RefetchButton = ({ onClick }: IProps) => (
  <Button size="icon" variant="ghost" className="rounded-full transition hover:rotate-45" onClick={onClick}>
    <RefreshCw />
  </Button>
);
