import type { ITag } from '@/types/tag';
import { Badge } from '@/components/ui/Badge';

export const TagsList = ({ tags }: { tags: ITag[] | undefined }) => {
  if (!tags) return null;
  return (
    <div className="my-4 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge variant="outline" key={tag.id}>
          {tag.name}
        </Badge>
      ))}
    </div>
  );
};
