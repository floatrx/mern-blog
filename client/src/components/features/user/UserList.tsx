import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { useSearchUsersQuery } from '@/api/users';

export const UserList = () => {
  const { data: users, error, isLoading, isFetching, isError } = useSearchUsersQuery();

  if (isLoading || isFetching) return <Spinner spinning />;

  if (error) return <div className="p-2">An error has occurred: {JSON.stringify(error)}</div>;

  return (
    <>
      {isLoading && <p>Loading...</p>}

      {isError && <p>Error loading posts</p>}

      <div className="grid-auto">
        {users?.map((user) => (
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
    </>
  );
};
