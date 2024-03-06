/**
 * @name TagsManager
 * @description A component that manages tags
 * TODO: Finish implementing this component
 */
import { Badge } from '@/components/ui/badge';
import { DataRenderer } from '@/components/hoc/data-renderer';
import { useSearchTagsQuery } from '@/api/tags';

export const TagsManager = () => {
  // const isLoggedIn = useAppSelector(selectIsLoggedIn);
  // const [isEditMode, setEditMode] = useState(false);
  // const [name, setValue] = useDebounceValue('', 500);
  // const [deleteTag] = useDeleteTagMutation(); // Delete tag
  const queryResult = useSearchTagsQuery({ name: '' });

  // const handleChange = useDebounceCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue(e.target.value);
  // }, 10);

  return (
    <>
      <div className="mb-6 flex max-w-xl items-center gap-4">
        {/*<Input className="max-w-[400px]" onChange={handleChange} placeholder="Search by name..." />*/}
        {/*{isLoggedIn && (*/}
        {/*  <Button onClick={() => setEditMode(!isEditMode)} variant="secondary">*/}
        {/*    {isEditMode ? 'Done' : 'Edit'}*/}
        {/*  </Button>*/}
        {/*)}*/}
      </div>
      <DataRenderer
        {...queryResult}
        className="flex gap-1 overflow-auto lg:flex-wrap"
        render={(tag) => (
          <Badge className="text-md px-4 transition-all" key={tag.id} variant="secondary">
            {tag.name}
            {/*{isEditMode && (*/}
            {/*  <Button size="xs" onClick={() => deleteTag(tag.id)} variant="link">*/}
            {/*    <X size={12} color="var(--red-10)" />*/}
            {/*  </Button>*/}
            {/*)}*/}
          </Badge>
        )}
      />
    </>
  );
};
