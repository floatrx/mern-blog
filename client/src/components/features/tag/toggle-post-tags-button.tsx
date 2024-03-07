import { Hash } from 'lucide-react';

import { useToggleTagMutation } from '@/api/posts';
import { useSearchTagsQuery } from '@/api/tags';
import { onlyAuth } from '@/components/hoc/only-auth';

import { Button } from '@/components/ui/button/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import type { IPost } from '@/types/post';

export const TogglePostTagsButton = onlyAuth(({ post }: { post: IPost }) => {
  const { data: tags } = useSearchTagsQuery({});
  const [toggleTag] = useToggleTagMutation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-foreground">
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
