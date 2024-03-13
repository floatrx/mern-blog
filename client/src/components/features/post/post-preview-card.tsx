/**
 * @desc IN PROGRESS!
 * TODO: Test performance, adaptive layout and animations
 */
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useGetPostQuery } from '@/api/posts';
import { closeSpring, openSpring } from '@/config/animations';
import { useScrollConstraints } from '@/hooks/framer/use-scroll-constraints';
import { safePostExcerpt } from '@/lib/post';
import { cn } from '@/lib/utils';
import { motion, useMotionValue } from 'framer-motion';

import { PostMeta } from '@/components/features/post/post-meta';
import { TagsList } from '@/components/features/tag/tags-list';

import { Button } from '@/components/ui/button/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Content } from '@/components/ui/content';
import { RichText } from '@/components/ui/rich-text';
import { Spinner } from '@/components/ui/spinner';

import type { IPost } from '@/types/post';

interface IProps {
  post: IPost;
}

/**
 * PostPreviewCard component
 * NOTE: Testing animation and framer-motion
 * @see https://www.framer.com/motion/layout-animations/
 * @param post
 * @constructor
 */
export const PostPreviewCard = ({ post }: IProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const { data: postDetailed, isFetching } = useGetPostQuery(post.id, { skip: !isSelected });

  const isPreview = !!(!isFetching && isSelected && postDetailed);

  // We'll use the opened card element to calculate the scroll constraints
  const cardRef = useRef(null);
  const constraints = useScrollConstraints(cardRef, isSelected);

  const y = useMotionValue(0);

  function checkSwipeToDismiss() {
    y.get() > 100 && setIsSelected(false);
  }

  return (
    <div className="mt-7 cursor-pointer" onClick={() => setIsSelected(!isSelected)}>
      {/* Overlay */}
      <motion.div layout className={cn(isPreview && 'fixed inset-0 bg-background/50 backdrop-blur-sm z-10')} />
      {/* Wrapper */}
      <motion.div
        ref={cardRef}
        className={cn(
          // Default classes
          'select-none relative origin-center',
          // Animate card
          isPreview && 'fixed w-screen h-screen inset-0 flex justify-center z-40 pt-20 max-h-fit overflow-y-auto',
        )}
        transition={isPreview ? openSpring : closeSpring}
        layout="preserve-aspect"
        drag={isSelected ? 'y' : false}
        dragConstraints={constraints}
        onDrag={checkSwipeToDismiss}
      >
        {/* Children */}
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
          className={cn(isPreview && 'max-w-[860px] text-xl')}
        >
          {/* Content (ShadCN card) */}
          <Card className={cn('space-y-4', isPreview && 'p-10 pt-0')}>
            <CardHeader>
              {/* Animate header */}
              <motion.div layout="position">
                {post.thumbnail && (
                  // Animate image
                  <motion.img
                    src={post.thumbnail}
                    alt="post"
                    layout="position"
                    dragConstraints={constraints}
                    transition={{ type: 'spring', stiffness: 600, damping: 40, delay: 0.1 }}
                    className={cn(
                      // Default classes
                      '-mt-14 pointer-events-none origin-center mb-2 h-52 w-full rounded-xl shadow-xl shadow-cyan-500/5 object-cover lg:max-w-[860px]',
                      // Animate image
                      isPreview && 'h-auto rounded-3xl shadow-3xl',
                    )}
                  />
                )}
                {/* Animate title */}
                <motion.div
                  className={cn('line-clamp-2 text-2xl flex items-center gap-2', isPreview && 'text-3xl sm:text-5xl font-bold py-5')}
                >
                  {post.title}
                  <Spinner spinning={isFetching} />
                </motion.div>
              </motion.div>
              <PostMeta post={post} />
            </CardHeader>
            <CardContent className="space-y-2">
              <TagsList tags={post.tags} />
              {isPreview ? <RichText content={postDetailed.body} /> : <Content text={safePostExcerpt(post.body)} />}
            </CardContent>
            <CardFooter>
              <Link
                to={`/posts/${post.id}`}
                className="space-y-5 text-blue-500"
                onClick={(e) => {
                  // Prevent card click
                  e.stopPropagation();
                }}
              >
                <Button variant="outline" size={isPreview ? 'lg' : 'default'}>
                  Read article
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};
