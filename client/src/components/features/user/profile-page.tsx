import { useAppSelector } from '@/hooks/redux';
import { selectAuth } from '@/store/auth';

export const ProfilePage = () => {
  const auth = useAppSelector(selectAuth);
  return (
    <div className="prose dark:prose-invert">
      <h1>Profile Page</h1>
      <div className="font-mono">{JSON.stringify(auth.user, null, 2)}</div>
    </div>
  );
};

export default ProfilePage;
