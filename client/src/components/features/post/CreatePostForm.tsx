import { useCreatePostMutation } from '@/api/posts';
import { PostForm } from '@/components/features/post/PostForm';
import type { IPostCreate } from '@/types/post';

export const CreatePostForm = () => {
  const [createPost, { isLoading }] = useCreatePostMutation(); // Create user

  const handleCreate = async (values: IPostCreate) => {
    await createPost(values).unwrap();
  };

  return <PostForm onSubmit={handleCreate} isLoading={isLoading} />;
};
