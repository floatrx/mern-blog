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
  <div className="mt-10 cursor-pointer relative">
    <Card className="space-y-4" onClick={() => onClick?.(post.id)}>
      <CardHeader>
        <motion.img
          // Implicitly provided key prevents reload image on toggle preview mode
          key={post.thumbnail}
          // layoutId must sync with same element in PostPreviewModal
          layoutId={`thumbnail-${post.id}`}
          src={post.thumbnail}
          alt={post.title}
          className="!-mt-10 select-none rounded-2xl shadow-xl shadow-cyan-500/5 dark:shadow-black object-cover aspect-video w-full h-auto"
        />
        <div className="flex justify-between gap-2 font-semibold py-2">
          <p className="text-2xl line-clamp-2">{post.title}</p>
          <div className="absolute top-14 left-1/2 translate-x-[-50%]">
            <Spinner spinning={isLoading} size="xl" />
          </div>
        </div>
        <PostMeta post={post} />
      </CardHeader>
      <CardContent className="space-y-2">
        <TagsList tags={post.tags} />
        <Content as="div" className="line-clamp-1" text={safePostExcerpt(post.body)} />
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
