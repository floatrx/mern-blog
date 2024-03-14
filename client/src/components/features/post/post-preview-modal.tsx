import { useEffect, useRef } from 'react';

import { motion } from 'framer-motion';

import { PostContent } from '@/components/features/post/post-content';

import type { IPost } from '@/types/post';

interface IProps {
  post: IPost;
  onClose?: () => void;
}

export const PostPreviewModal = ({ post, onClose }: IProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Scroll to ref top on mount
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        key="overlay"
        className="fixed inset-0 bg-background/50 sm:backdrop-blur-sm"
        onClick={() => onClose?.()}
      />
      {/* Preview modal */}
      <motion.div
        ref={ref}
        layoutId={post.id} // layoutId must sync with the card
        layoutRoot // prevents layout scaling
        className="absolute top-[72px] inset-x-0 flex items-start pointer-events-none b2"
      >
        <PostContent onDismiss={onClose} post={post} />
      </motion.div>
    </>
  );
};
