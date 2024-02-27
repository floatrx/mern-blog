import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { MDXEditor, type MDXEditorMethods, type MDXEditorProps } from '@mdxeditor/editor';

// Styles
import '@mdxeditor/editor/style.css';
import '@/editor.css';

// Import all plugins
import { getMarkdownEditorPlugins } from '@/components/editor/editor.plugins';

interface IProps extends Omit<MDXEditorProps, 'markdown'> {
  value: string;
  mode?: 'default' | 'view';
}

type TMarkdownEditor = React.ForwardRefExoticComponent<IProps & React.RefAttributes<MDXEditorMethods>>;

export const MarkdownEditor: TMarkdownEditor = forwardRef(({ className, value = '', mode, ...props }, ref) => (
  <MDXEditor
    contentEditableClassName="prose dark:prose-invert lg:prose-2xl"
    markdown={value}
    placeholder="Write your text here..."
    className={cn('dark-editor', className)}
    plugins={getMarkdownEditorPlugins(mode)}
    ref={ref}
    {...props}
  />
));
