import {
  BoldItalicUnderlineToggles,
  codeBlockPlugin,
  CodeToggle,
  CreateLink,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from '@mdxeditor/editor';
import { uploadApi } from '@/api/upload';
import { store } from '@/store/store';

const handleImageUpload = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return await store
    .dispatch(uploadApi.endpoints.upload.initiate(formData))
    .unwrap()
    .then((res) => res.location);
};

export const getMarkdownEditorPlugins = (mode: 'default' | 'view' = 'default', initialValue?: string) =>
  [
    listsPlugin(),
    quotePlugin(),
    headingsPlugin({ allowedHeadingLevels: [1, 2, 3, 4, 5, 6] }),
    linkPlugin(),
    linkDialogPlugin(),
    tablePlugin(),
    thematicBreakPlugin(),
    frontmatterPlugin(),
    codeBlockPlugin({ defaultCodeBlockLanguage: '' }),
    markdownShortcutPlugin(),
    diffSourcePlugin({ diffMarkdown: initialValue, viewMode: 'rich-text' }),
    imagePlugin({
      imageUploadHandler: handleImageUpload,
    }),
  ].concat(
    mode === 'view'
      ? []
      : [
          toolbarPlugin({
            toolbarContents: () =>
              mode === 'default' && (
                <>
                  <UndoRedo />
                  <BoldItalicUnderlineToggles />
                  <CodeToggle />
                  <CreateLink />
                  <ListsToggle />
                  <InsertImage />
                  <InsertTable />
                  <InsertThematicBreak />
                  <DiffSourceToggleWrapper>
                    <UndoRedo />
                  </DiffSourceToggleWrapper>
                </>
              ),
          }),
        ],
  );
