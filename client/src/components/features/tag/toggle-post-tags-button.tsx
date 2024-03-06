import type { IPost } from '@/types/post';
import { useSearchTagsQuery } from '@/api/tags';
import { useToggleTagMutation } from '@/api/posts';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button/button';
import { Hash } from 'lucide-react';

import { onlyAuth } from '@/components/hoc/only-auth';

export const TogglePostTagsButton = onlyAuth(({ post }: { post: IPost }) => {
  const { data: tags } = useSearchTagsQuery({});
  const [toggleTag] = useToggleTagMutation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Hash />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-[40vh] w-56 overflow-auto">
        {tags?.map((tag) => (
          <DropdownMenuCheckboxItem
            key={tag.id}
            checked={post.tags.some(({ id }) => id === tag.id)}
            onClick={() => {
              toggleTag({ id: post.id, tagId: tag.id });
            }}
          >
            {tag.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
