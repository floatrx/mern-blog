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
    // ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        key="overlay"
        className="fixed inset-0 bg-background/50 sm:backdrop-blur-sm no-body-scroll"
        onClick={() => onClose?.()}
      />
      {/* Preview modal */}
      <motion.div
        ref={ref}
        layoutId={post.id} // layoutId must sync with the card
        layoutRoot // prevents layout scaling
        className="fixed top-[64px] inset-x-0 pointer-events-none max-h-[calc(100vh-64px)] overflow-y-auto border border-l-green-400-500"
      >
        <PostContent onDismiss={onClose} post={post} />
        <hr className="my-10" />
      </motion.div>
    </>
  );
};
