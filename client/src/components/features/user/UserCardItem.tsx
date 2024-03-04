import type { IUser } from '@/types/user';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/Card';

export const UserCardItem = ({ user }: { user: IUser }) => (
  <Card>
    <CardHeader>
      <div className="flex gap-2">
        <span className="font-medium">{user?.name}</span>
        <span>
          <Badge>{user?.role?.name}</Badge>
        </span>
      </div>
      <CardDescription>{user?.email}</CardDescription>
    </CardHeader>
    <CardContent>
      <CardDescription>{user.id}</CardDescription>
    </CardContent>
  </Card>
);
