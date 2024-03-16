import { useCallback, useState } from 'react';
import { useParams } from 'react-router';

import { useGetPostQuery } from '@/api/posts';

import { CommentForm } from '@/components/features/comment/comment-form';
import { CommentThread } from '@/components/features/comment/comment-thread';
import { PostContent } from '@/components/features/post/post-content';

import { Spinner } from '@/components/ui/spinner';

import type { ICommentWithoutPost } from '@/types/comment';

const focusOnCommentForm = () => {
  const $form = document.getElementById('comment-form');
  $form?.scrollIntoView({ behavior: 'smooth' });
  $form?.focus();
};

export const PostSinglePage = () => {
  const { id } = useParams();
  const { data: post, isLoading, isError } = useGetPostQuery(id, { skip: !id });
  const [selectedComment, setSelectedComment] = useState<ICommentWithoutPost | null>(null);

  // Toggle selected comment -> set to null if already selected
  const toggleSelectedComment = useCallback((comment: ICommentWithoutPost) => {
    setSelectedComment((prev) => {
      const activeComment = prev?.id === comment?.id ? null : comment;
      // if activeComment selected try to focus on comment form (without ref)
      activeComment && focusOnCommentForm();
      return activeComment;
    });
  }, []);

  if (!id) return <div>No ID provided</div>;

  if (!post && isError) return <div>Post {id} not found!</div>;

  if (isLoading) return <Spinner spinning />;

  return (
    <PostContent viewMode="full" post={post}>
      {post && (
        <div className="w-full space-y-2">
          <CommentThread idPost={post.id} onReply={toggleSelectedComment} />
          <CommentForm postId={post.id} selectedComment={selectedComment} />
        </div>
      )}
    </PostContent>
  );
};

export default PostSinglePage;
