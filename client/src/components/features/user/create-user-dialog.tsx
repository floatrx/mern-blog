import { Plus } from 'lucide-react';
import { useState } from 'react';

import { UserForm } from '@/components/features/user/user-form';

import { Button } from '@/components/ui/button/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useCreateUserMutation } from "@/api/users";
import type { IUserCreateRequest } from "@/types/user";
import { toast } from "@/hooks/use-toast";

export const CreateUserDialog = () => {
  const [open, setOpen] = useState(false);

  const [createUser, { isLoading }] = useCreateUserMutation(); // Create user

  const handleCreateUser = (async (values:IUserCreateRequest) => {
    try {
      await createUser(values);
      toast({ title: 'User created', description: 'User has been created successfully' });
      setOpen(false);
    } catch (e) {
      console.error(e.message);
      toast({ title: 'Error', description: e.message });
    }
  });

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
          <UserForm onSubmit={handleCreateUser} isLoading={isLoading} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
