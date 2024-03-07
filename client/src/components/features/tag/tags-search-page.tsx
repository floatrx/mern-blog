import { CreateTag } from '@/components/features/tag/create-tag';
import { TagsManager } from '@/components/features/tag/tag-manager';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';

export const TagsSearchPage = () => (
  <div className="space-y-4">
    <Card>
      <CardHeader>
        <Heading text="Tags" />
      </CardHeader>
      <CardContent>
        <TagsManager />
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <Heading text="Create new" level={3} />
      </CardHeader>
      <CardContent>
        <CreateTag />
      </CardContent>
    </Card>
  </div>
);

export default TagsSearchPage;
