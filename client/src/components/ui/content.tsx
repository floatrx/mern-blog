import { cn } from '@/lib/utils';

interface Html {
  text: string | undefined;

  // wrap html content (required for dangerouslySetInnerHTML) -> default wrapper is <span>
  as?: 'span' | 'div' | 'p';

  // custom className for wrapper (will be ignored when render as simple text)
  className?: string;

  // don't check for html tags -> always render as html (there are some cases when html tags are not detected but &nbsp; and other html entities are present)
  forceHtml?: boolean;
}

/**
 * Render content with HTML tags if it has any or just text
 */
export const Content = ({ text, as: Wrapper = 'span', className, forceHtml }: Html) => {
  if (!text) return null;
  return forceHtml || text.match(/<.*?>/g) ? (
    <Wrapper className={cn('prose dark:prose-invert', className)} dangerouslySetInnerHTML={{ __html: text }} />
  ) : (
    text
  );
};
