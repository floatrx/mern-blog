import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button/Button';
import { CreateUserForm } from '@/components/features/user/CreateUserForm';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export const CreateUserDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Plus size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create new user</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <CreateUserForm onFinish={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
