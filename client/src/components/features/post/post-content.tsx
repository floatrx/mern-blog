import { PostEditButton } from '@/components/features/post/post-edit-button';
import { PostMeta } from '@/components/features/post/post-meta';
import { TagsList } from '@/components/features/tag/tags-list';
import { TogglePostTagsButton } from '@/components/features/tag/toggle-post-tags-button';

import { RichText } from '@/components/ui/rich-text';

import type { IPost } from '@/types/post';

export const PostContent = ({ post }: { post: IPost | undefined }) =>
  !!post && (
    <div className="prose prose-2xl mx-auto mt-16 space-y-8 rounded-xl bg-card md:p-10 shadow-lg dark:prose-invert lg:prose-xl dark:border">
      {post.thumbnail && <img className="!-mt-20 w-full object-cover block rounded-3xl" src={post.thumbnail} alt={post.title} />}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <PostMeta post={post} />
        <div className="stack">
          <PostEditButton id={post.id} />
          <TogglePostTagsButton post={post} />
        </div>
      </div>
      <TagsList tags={post.tags} />
      <h1>{post.title}</h1>
      <RichText content={post.body} />
    </div>
  );

// https://blog.floatrx.net/posts/65e92ee0c9b2e7d417712384
// https://blog.floatrx.net/posts/65e92ee0c9b2e7d417712384
