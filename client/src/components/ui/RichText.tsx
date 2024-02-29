import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils'; // Testing components

// Styles
export type RichTextProps = {
  content?: string;
  className?: string;
  excerpt?: boolean;
};

/**
 * Shared.RichText
 * Supports markdown, gfm, raw html
 *
 * ¯\_(ツ)_/¯
 * NOTE:
 *      This component always wraps content into <p> (paragraph)
 *      If you need to render without <p> use component <HTML> ->
 *      it supports only raw html, and wraps content into <span>
 *
 * @relation StrapiSharedRichText
 * @param content - content to render
 * @param className - custom className
 * @param excerpt - limit content to 3 lines
 * @constructor
 */
export const RichText = ({ content, className, excerpt }: RichTextProps) => {
  if (!content) return null;

  // If excerpt is true, only allow p, a, strong, em, code elements
  const allowedElements = excerpt ? ['p', 'a', 'strong', 'em', 'code'] : undefined;

  return (
    <Markdown
      allowedElements={allowedElements}
      remarkRehypeOptions={{ allowDangerousHtml: true }}
      className={cn(className, 'prose dark:prose-invert lg:prose-xl', excerpt && 'line-clamp-3')}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    >
      {content}
    </Markdown>
  );
};
