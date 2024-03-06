import type { IPostCreate } from '@/types/post';
import { PostForm } from '@/components/features/post/post-form';
import { useCreatePostMutation } from '@/api/posts';
import { useNavigate } from 'react-router-dom';

export const CreatePostForm = () => {
  const [createPost, { isLoading }] = useCreatePostMutation(); // Create user
  const navigate = useNavigate();

  const handleCreate = async (values: IPostCreate) => {
    const post = await createPost(values).unwrap();
    navigate(`/posts/${post.id}`);
  };

  return <PostForm onSubmit={handleCreate} isLoading={isLoading} />;
};

export default CreatePostForm;
