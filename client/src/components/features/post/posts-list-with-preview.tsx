import { useState } from 'react';

import { useGetPostQuery, useSearchPostsQuery } from '@/api/posts';
import { DataRenderer } from '@/components/hoc/data-renderer';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useDebounceCallback, useDebounceValue } from 'usehooks-ts';

import { PostCard } from '@/components/features/post/post-card';
import { PostPreviewModal } from '@/components/features/post/post-preview-modal';

import { Input } from '@/components/ui/form/input';

export const PostsListWithPreview = () => {
  // Search
  const [title, setValue] = useDebounceValue('', 500);

  // Posts list
  const postsQuery = useSearchPostsQuery({ title });

  // Preview
  const [previewId, setPreviewId] = useState<boolean | string>(false);
  // -- Post full for preview
  const { data: post, isLoading, isFetching } = useGetPostQuery(String(previewId), { skip: !previewId });
  const isViewing = !!(previewId && post && !isLoading && !isFetching);

  const handleChange = useDebounceCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, 10);

  return (
    <>
      {/* Search */}
      <motion.div initial={{ translateX: -20, opacity: 0 }} animate={{ translateX: 0, opacity: 1, transition: { delay: 0.2 } }}>
        <Input className="max-w-[400px] focus:max-w-full transition-all" onChange={handleChange} placeholder="Search by title..." />
      </motion.div>

      {/* Post cards */}
      <LayoutGroup id="posts">
        <AnimatePresence>
          <DataRenderer
            className="grid-auto"
            {...postsQuery}
            render={(post, idx) => (
              <motion.div
                layoutRoot // prevents layout scaling
                layoutId={post.id} // use the same id for the preview
                // Show animation (on mount)
                initial={{ translateY: 15, opacity: 0, scale: 0.8 }}
                animate={{
                  translateY: 0,
                  opacity: 1,
                  scale: 1,
                  transition: { type: 'spring', stiffness: 360, damping: 30, delay: 0.1 * idx },
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 1 }}
              >
                <PostCard isLoading={previewId === post.id && isLoading} onClick={setPreviewId} post={post} />
              </motion.div>
            )}
          />

          {isViewing && <PostPreviewModal key={post.id} post={post} onClose={() => setPreviewId(false)} />}
        </AnimatePresence>
      </LayoutGroup>
    </>
  );
};
