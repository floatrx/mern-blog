import { useDragTransform } from '@/hooks/framer/use-drag-transform';
import { motion } from 'framer-motion';

import { PostEditButton } from '@/components/features/post/post-edit-button';
import { PostMeta } from '@/components/features/post/post-meta';
import { TagsList } from '@/components/features/tag/tags-list';
import { TogglePostTagsButton } from '@/components/features/tag/toggle-post-tags-button';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { RichText } from '@/components/ui/rich-text';

import type { IPost } from '@/types/post';

interface IProps {
  post: IPost | undefined;
}

export const PostContent = ({ post }: IProps) => {
  const [imgDragTransformProps] = useDragTransform();

  return (
    !!post && (
      <motion.div
        initial={{ opacity: 0, translateY: -40 }}
        animate={{ opacity: 1, translateY: 0, transition: { duration: 1.3, type: 'spring', stiffness: 200, damping: 30 } }}
        exit={{ opacity: 0, translateY: -40 }}
        className="mt-10 prose prose-xl max-w-[860px] mx-auto dark:prose-invert lg:prose-xl pointer-events-auto"
      >
        <Card className="px-5">
          <CardHeader>
            {post.thumbnail && (
              <motion.img
                // Implicitly provided key prevents reload image on toggle preview mode
                key={post.thumbnail}
                // layoutId must sync with same element in PostPreviewModal
                layoutId={`thumbnail-${post.id}`}
                // Swoosh animation
                initial={{ y: -50, rotate: 3 }}
                animate={{ y: 0, rotate: 0, transition: { duration: 2, type: 'spring', stiffness: 300, damping: 10, delay: 0.1 } }}
                // Stylish
                className="!-mt-14 origin-center w-full object-cover block rounded-3xl select-none aspect-video z-50 min-w-full"
                src={post.thumbnail}
                alt={post.title}
                // Enable 3d transform on drag
                {...imgDragTransformProps}
              />
            )}
            <div className="flex flex-wrap items-center justify-between gap-2 select-none">
              <PostMeta post={post} />
              <div className="stack">
                <PostEditButton id={post.id} />
                <TogglePostTagsButton post={post} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <TagsList tags={post.tags} />
            <motion.h1 className="text-3xl sm:text-6xl">{post.title}</motion.h1>
            <RichText content={post.body} />
          </CardContent>
        </Card>
      </motion.div>
    )
  );
};
