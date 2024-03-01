import type { IPost } from '@/types/post';
import { useSearchTagsQuery } from '@/api/tags';
import { useToggleTagMutation } from '@/api/posts';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import { Button } from '@/components/ui/button/Button';
import { Hash } from 'lucide-react';

export const TogglePostTagsDropdownMenu = ({ post }: { post: IPost }) => {
  const { data: tags } = useSearchTagsQuery({});
  const [toggleTag] = useToggleTagMutation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-8 p-2" variant="outline" size="icon">
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
};
