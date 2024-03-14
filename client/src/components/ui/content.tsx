import { cn } from '@/lib/utils';

interface Html {
  text: string | undefined;

  // wrap html content (required for dangerouslySetInnerHTML) -> default wrapper is <span>
  as?: 'span' | 'div' | 'p';

  // custom className for wrapper (will be ignored when render as simple text)
  className?: string;
}

/**
 * Render content with HTML tags if it has any or just text
 */
export const Content = ({ text, as: Wrapper = 'span', className }: Html) => {
  if (!text) return null;
  return text.match(/<.*?>/g) ? (
    <Wrapper className={cn('prose dark:prose-invert', className)} dangerouslySetInnerHTML={{ __html: text }} />
  ) : (
    text
  );
};
