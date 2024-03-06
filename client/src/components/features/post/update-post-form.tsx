import { useGetPostQuery, useUpdatePostMutation } from '@/api/posts';
import { PostForm } from '@/components/features/post/post-form';
import type { IPostCreate } from '@/types/post';
import { useNavigate, useParams } from 'react-router-dom';

export const UpdatePostForm = () => {
  const id = useParams().id;
  const navigate = useNavigate();

  const { data: post, isFetching } = useGetPostQuery(id, { skip: !id });
  const [updatePost, { isLoading }] = useUpdatePostMutation(); // Create user

  if (isFetching) return <div>Loading...</div>;

  if (!id) return <div>No ID provided</div>;

  const handleUpdate = async (values: IPostCreate) => {
    try {
      await updatePost({ id, ...values }).unwrap();
      navigate(`/posts/${id}`); // Redirect to updated post
    } catch (e) {
      // ignore
    }
  };

  return <PostForm id={id} onSubmit={handleUpdate} isLoading={isLoading} initialValues={post} />;
};

export default UpdatePostForm;
