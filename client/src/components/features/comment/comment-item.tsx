import { QuoteIcon } from 'lucide-react';

import { popUpVariants } from '@/config/animations';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

import { CommentDeleteButton } from '@/components/features/comment/comment-delete-button';
import type { ICommentItemProps } from '@/components/features/comment/comment-thread';
import { UserInfo } from '@/components/features/user/user-info';

import { Button } from '@/components/ui/button/button';

export const CommentItem = ({ comment, className, onSelect }: ICommentItemProps) => (
  <motion.blockquote className={cn('not-prose border rounded-xl my-5 py-4 px-6', className)} variants={popUpVariants.item}>
    <div className="group comment stack text-sm text-muted-foreground">
      {/* Author */}
      <cite className="not-italic">
        <UserInfo user={comment.author} /> • {new Date(comment.createdAt).toLocaleString()}
      </cite>
      {/* Delete */}
      <CommentDeleteButton id={comment.id} />
      {/* Reply */}
      <Button onClick={() => onSelect(comment)} variant="outline" size="icon" className="size-6 transition">
        <QuoteIcon size={14} />
      </Button>
    </div>
    <p>{comment.text}</p>
    {/* Render nested comments */}
    {!!comment.thread &&
      comment.thread.map((c) => <CommentItem key={c.id} comment={c} className="py-2 my-4 last:mb-0" onSelect={onSelect} />)}
  </motion.blockquote>
);
