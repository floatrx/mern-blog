import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';

export type RichTextProps = {
  content?: string;
  className?: string;
};

// Custom components
// const testComponents = {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   button: ({ node, ...props }) => <Button {...props} />,
// };

export const RichText = ({ content, className }: RichTextProps) => {
  if (!content) return null;

  return (
    <Markdown
      remarkRehypeOptions={{ allowDangerousHtml: true }}
      className={cn(className)}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      // components={testComponents}
    >
      {content}
    </Markdown>
  );
};
