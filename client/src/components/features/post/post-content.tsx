import { useDragTransform } from '@/hooks/framer/use-drag-transform';
import { type ResolvedValues, motion } from 'framer-motion';

import { PostEditButton } from '@/components/features/post/post-edit-button';
import { PostMeta } from '@/components/features/post/post-meta';
import { TagsList } from '@/components/features/tag/tags-list';
import { TogglePostTagsButton } from '@/components/features/tag/toggle-post-tags-button';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { RichText } from '@/components/ui/rich-text';

import type { IPost } from '@/types/post';

interface IProps {
  post: IPost | undefined;
  onDismiss?: () => void;
  rotateDirection?: 'left' | 'right';
}

export const PostContent = ({ post, onDismiss }: IProps) => {
  const [imgDragTransformProps] = useDragTransform();
  const handleDragDismiss = (latest: ResolvedValues) => {
    if (+latest.y > 15) onDismiss?.(); // todo: debug this delta
  };
  return (
    !!post && (
      <motion.article
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1.3, type: 'spring', stiffness: 200, damping: 30 } }}
        exit={{ opacity: 0, y: -40 }}
        className="mt-10 prose sm:prose-xl lg:prose-2xl dark:prose-invert mx-auto pointer-events-auto max-w-full md:max-w-[860px]"
      >
        <Card className="sm:px-5">
          <CardHeader>
            {/* THUMBNAIL */}
            <motion.img
              // Implicitly provided key prevents reload image on toggle preview mode
              key={post.thumbnail}
              layout
              // layoutId must sync with same element in PostPreviewModal
              layoutId={`thumbnail-${post.id}`}
              // Swoosh animation
              initial={{ y: -30 }}
              animate={{ y: 0, transition: { type: 'spring', stiffness: 400, damping: 30 } }}
              // Stylish
              // className="!-mt-14 b1 origin-center w-full object-cover block rounded-3xl select-none aspect-video z-50 min-w-full"
              className="!-mt-14 select-none rounded-xl shadow-2xl shadow-cyan-500/15 object-cover aspect-video z-30"
              src={post.thumbnail}
              alt={post.title}
              // Enable 3d transform on drag
              {...imgDragTransformProps}
              onUpdate={handleDragDismiss}
              onAnimationComplete={() => {
                console.log('Animation complete');
              }}
              onDragTransitionEnd={() => {
                console.log('Transition end');
              }}
            />
            <div className="flex flex-wrap items-center justify-between gap-2 select-none">
              {/* AUTHOR / CREATED DATE */}
              <PostMeta post={post} />
              {/* CONTROLS */}
              <div className="stack">
                <PostEditButton id={post.id} />
                <TogglePostTagsButton post={post} />
              </div>
            </div>
          </CardHeader>
          {/* CONTENT */}
          <CardContent className="space-y-2">
            {/* TAGS */}
            <TagsList tags={post.tags} />
            {/* HEADING */}
            <motion.h1 className="text-3xl sm:text-6xl">{post.title}</motion.h1>
            {/* BODY */}
            <RichText content={post.body} />
          </CardContent>
        </Card>
      </motion.article>
    )
  );
};
