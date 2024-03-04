import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/button/Button';
import { DataBoundary } from '@/components/DataBoundary';
import { X } from 'lucide-react';
import { selectIsLoggedIn } from '@/store/auth';
import { useAppSelector } from '@/hooks/redux';
import { useDeleteTagMutation, useSearchTagsQuery } from '@/api/tags';
import { useState } from 'react';

export const TagsManager = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [isEditMode, setEditMode] = useState(false);
  // const [name, setValue] = useDebounceValue('', 500);
  const [deleteTag] = useDeleteTagMutation(); // Delete tag
  const queryResult = useSearchTagsQuery({ name: '' });

  // const handleChange = useDebounceCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue(e.target.value);
  // }, 10);

  return (
    <>
      <div className="mb-6 flex max-w-xl items-center gap-4">
        {/*<Input className="max-w-[400px]" onChange={handleChange} placeholder="Search by name..." />*/}
        {isLoggedIn && (
          <Button onClick={() => setEditMode(!isEditMode)} variant="secondary">
            {isEditMode ? 'Done' : 'Edit'}
          </Button>
        )}
      </div>
      <DataBoundary
        {...queryResult}
        className="flex flex-wrap gap-1"
        render={(tag) => (
          <Badge className="text-md px-4 transition-all" key={tag.id} variant="secondary">
            {tag.name}
            {isEditMode && (
              <Button size="xs" onClick={() => deleteTag(tag.id)} variant="link">
                <X size={12} color="var(--red-10)" />
              </Button>
            )}
          </Badge>
        )}
      />
    </>
  );
};
