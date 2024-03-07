import { uploadApi } from '@/api/upload';
import { store } from '@/store/store';
import {
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  DiffSourceToggleWrapper,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  UndoRedo,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from '@mdxeditor/editor';

const codeBlockLanguages = ['', 'javascript', 'typescript', 'jsx', 'tsx', 'html', 'css', 'scss', 'json', 'yaml', 'shell', 'markdown'];

/**
 * Handle image upload
 * TODO: Test this feature
 * @param file
 */
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
    // linkDialogPlugin(),
    tablePlugin(),
    thematicBreakPlugin(),
    frontmatterPlugin(),
    codeBlockPlugin({ defaultCodeBlockLanguage: 'javascript' }),
    codeMirrorPlugin({
      codeBlockLanguages: codeBlockLanguages.reduce((acc, language) => {
        acc[language] = language;
        return acc;
      }, {}),
    }),
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
