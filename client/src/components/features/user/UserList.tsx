import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { useSearchUsersQuery } from '@/api/users';

export const UserList = () => {
  const { data: users = [], error, isLoading, isFetching } = useSearchUsersQuery();

  if (isLoading || isFetching) return <Spinner />;

  if (error) return <div className="p-2">An error has occurred: {JSON.stringify(error)}</div>;

  return (
    <div className="space-y-3 p-2">
      <h2 className="text-lg">
        User list <Badge>{users.length}</Badge>
      </h2>

      <div className="grid-auto grid gap-2">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <div className="flex gap-2">
                <span className="font-medium">{user.name}</span>
                <span>
                  <Badge>{user.role.name}</Badge>
                </span>
              </div>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>

            <CardContent>
              <CardDescription>{user.id}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
