import { MessagesSquare } from 'lucide-react';
import { useMemo } from 'react';

import { useGetCommentsThreadQuery } from '@/api/comments';
import { popUpVariants } from '@/config/animations';
import { motion } from 'framer-motion';

import { CommentItem } from '@/components/features/comment/comment-item';

import { CounterBadge } from '@/components/ui/counter-badge';
import { Spinner } from '@/components/ui/spinner';

import type { IComment, ICommentWithoutPost } from '@/types/comment';

export interface ICommentThreadProps {
  idPost: string;
  onReply: (comment: ICommentWithoutPost) => void;
}

export interface ICommentItemProps {
  comment: ICommentWithoutPost | IComment;
  className?: string;
  onSelect: ICommentThreadProps['onReply'];
}

export const CommentThread = ({ idPost, onReply }: ICommentThreadProps) => {
  const { data: comments = [], isLoading } = useGetCommentsThreadQuery(idPost);
  const commentsCount = useMemo(() => comments.reduce((acc, comment) => acc + comment.thread.length + 1, 0), [comments]);

  return (
    <div>
      <h2 className="not-prose stack mb-2">
        <MessagesSquare /> Comments <Spinner spinning={isLoading} /> <CounterBadge count={commentsCount} />
      </h2>

      {!!comments.length && (
        <motion.div variants={popUpVariants.wrapper} initial="hidden" animate="visible">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} onSelect={onReply} />
          ))}
        </motion.div>
      )}

      {!comments.length && !isLoading && <div className="text-muted-foreground">No comments yet</div>}
    </div>
  );
};
