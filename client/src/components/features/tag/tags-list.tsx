import { Badge } from '@/components/ui/badge';

import type { ITag } from '@/types/tag';

export const TagsList = ({ tags }: { tags: ITag[] | undefined }) =>
  !!tags && (
    <div className="my-4 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag.id} variant="outline">
          {tag.name}
        </Badge>
      ))}
    </div>
  );
