import { Button } from '@/components/ui/button/button';
import { RefreshCw } from 'lucide-react';
import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface IProps {
  onClick: () => void;
}
export const RefetchButton = ({ onClick }: IProps) => {
  const { toast } = useToast();
  const handleClicked = useCallback(() => {
    onClick();
    toast({ title: 'Posts received', duration: 500 });
  }, [onClick, toast]);

  return (
    <Button size="icon" variant="ghost" className="rounded-full transition hover:rotate-45" onClick={handleClicked}>
      <RefreshCw />
    </Button>
  );
};
