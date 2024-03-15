import { Pencil } from 'lucide-react';

import { UpdateUserDialog } from '@/components/features/user/update-user-dialog';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';

import type { IUser } from '@/types/user';

export const UserCardItem = ({ user }: { user: IUser }) => (
  <Card>
    <CardHeader>
      <div className="flex gap-2">
        <span className="font-medium">{user?.name}</span>
        <span className="stack">
          <Badge>{user?.role?.name}</Badge>
        </span>
        <span className="flex-1" />
        <UpdateUserDialog
          initialValues={user}
          trigger={
            <Button variant="outline" size="xs" className="px-1">
              <Pencil size={14} />
            </Button>
          }
        />
      </div>
      <CardDescription>{user?.email}</CardDescription>
    </CardHeader>
    <CardContent>
      <CardDescription>{user.id}</CardDescription>
    </CardContent>
  </Card>
);
