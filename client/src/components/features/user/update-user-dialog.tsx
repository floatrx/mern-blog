import { Pencil } from 'lucide-react';
import { useState } from 'react';

import { useUpdateUserMutation } from '@/api/users';
import { toast } from '@/hooks/use-toast';

import { UserForm } from '@/components/features/user/user-form';

import { Button } from '@/components/ui/button/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import type { IUserCreateRequest, IUserUpdateRequest } from '@/types/user';

interface IProps {
  initialValues: Omit<IUserUpdateRequest, 'password'>;
  trigger?: React.ReactNode;
}

export const UpdateUserDialog = ({ initialValues, trigger }: IProps) => {
  const [open, setOpen] = useState(false);

  const [updateUser, { isLoading }] = useUpdateUserMutation(); // Create user

  const handleUpdateUser = async (values: IUserCreateRequest) => {
    const payload = { ...values, id: initialValues.id };
    console.log('payload', payload);
    try {
      await updateUser(payload);
      toast({ title: 'User updated', description: 'User has been updated successfully' });
      setOpen(false);
    } catch (e) {
      console.error(e.message);
      toast({ title: 'Error', description: e.message });
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="icon">
            <Pencil size={24} />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create new user</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <UserForm onSubmit={handleUpdateUser} isLoading={isLoading} initialValues={initialValues} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
