import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/Card';
import { Spinner } from '@/components/ui/Spinner';
import { useSearchUsersQuery } from '@/api/users';
import { Link } from 'react-router-dom';

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
                    <li key={post.id}>
                      <Link to={`/posts/${post.id}`} className="grid grid-cols-[25px_1fr] hover:text-blue-500">
                        <span className="m-1 h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                        <span className="font-medium">{post.title}</span>
                      </Link>
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
