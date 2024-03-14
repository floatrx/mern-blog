/**
 * @desc IN PROGRESS!
 * TODO: Test performance, adaptive layout and animations
 */
import { EyeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import { safePostExcerpt } from '@/lib/post';
import { motion } from 'framer-motion';

import { PostMeta } from '@/components/features/post/post-meta';
import { TagsList } from '@/components/features/tag/tags-list';

import { Button } from '@/components/ui/button/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Content } from '@/components/ui/content';
import { Spinner } from '@/components/ui/spinner';

import type { IPost } from '@/types/post';

interface IProps {
  post: IPost;
  onClick?: (postId: string) => void;
  isLoading?: boolean;
}

/**
 * PostPreviewCard component 2.0
 * Animated card with post preview (framer-motion)
 */
export const PostCard = ({ post, onClick, isLoading }: IProps) => (
  <div className="mt-10 cursor-pointer">
    <Card className="space-y-4" onClick={() => onClick?.(post.id)}>
      <CardHeader>
        {post.thumbnail && (
          <motion.img
            key={post.thumbnail}
            layoutId={`thumbnail-${post.id}`}
            src={post.thumbnail}
            alt="post"
            className="-mt-14 pointer-events-none origin-center mb-2 h-52 w-full rounded-xl shadow-xl shadow-cyan-500/5 object-cover lg:max-w-[860px]"
          />
        )}
        <motion.div transition={{ type: 'inertia' }} className="line-clamp-2 text-2xl flex items-center gap-2">
          {post.title}
          <Spinner spinning={isLoading} />
        </motion.div>
        <PostMeta post={post} />
      </CardHeader>
      <CardContent className="space-y-2">
        <TagsList tags={post.tags} />
        <Content text={safePostExcerpt(post.body)} />
      </CardContent>
      <CardFooter>
        <Link
          to={`/posts/${post.id}`}
          className="space-y-5 text-blue-500 font-medium"
          // Prevents card click event propagation -> coz: card has onClick event -> show preview
          onClick={(e) => e.stopPropagation()}
        >
          <Button variant="outline" size="default" className="stack bg-transparent text-foreground">
            <EyeIcon size={16} />
            Read full article
          </Button>
        </Link>
      </CardFooter>
    </Card>
  </div>
);
