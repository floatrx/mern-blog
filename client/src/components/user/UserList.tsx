import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
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

      <div className="grid grid-cols-subgrid gap-2">
        {users.map((user) => (
          <Card className="hover:bg-sky-100" key={user.id}>
            <CardHeader>
              <span className="font-medium">{user.name}</span>
              <CardDescription>
                {user.email} / {user.id}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div>
                <h5>
                  Posts <Badge variant="outline">{user.posts.length}</Badge>
                </h5>
                <ol className="m-5 space-y-3">
                  {user.posts.map((post) => (
                    <li key={post._id} className="grid grid-cols-[25px_1fr]">
                      <span className="m-1 h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                      <span className="font-medium">{post.title}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
