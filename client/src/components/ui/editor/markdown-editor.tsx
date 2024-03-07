import { forwardRef, useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';
import '@/styles/editor.css';
import { MDXEditor, type MDXEditorMethods, type MDXEditorProps } from '@mdxeditor/editor';
// Styles
import '@mdxeditor/editor/style.css';

// Import all plugins
import { getMarkdownEditorPlugins } from '@/components/ui/editor/editor.plugins';

interface IProps extends Omit<MDXEditorProps, 'markdown'> {
  value: string;
  mode?: 'default' | 'view';
}

type TMarkdownEditor = React.ForwardRefExoticComponent<IProps & React.RefAttributes<MDXEditorMethods>>;

export const MarkdownEditor: TMarkdownEditor = forwardRef(({ className, value = '', mode, ...props }, _) => {
  const editorRef = useRef<MDXEditorMethods | null>(null);
  const initialValue = useRef(value);

  // Compatibility with react-hook-form & ShadCN form
  useEffect(() => {
    if (!editorRef.current) return; // skip first render
    if (value === editorRef.current.getMarkdown()) return;
    editorRef.current?.setMarkdown(value); // sync value from parent form control
  }, [value]);

  return (
    <MDXEditor
      contentEditableClassName="prose dark:prose-invert lg:prose-2xl min-h-[300px]"
      markdown={value}
      placeholder="Write your text here..."
      className={cn('dark-editor', className)}
      plugins={getMarkdownEditorPlugins(mode, initialValue.current)}
      ref={editorRef}
      {...props}
    />
  );
});
