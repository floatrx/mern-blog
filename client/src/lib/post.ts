const removeHTMLTags = (str: string): string => str.replace(/<[^>]*>/g, '');
const removeExtraSpaces = (str: string): string => str.replace(/\s+/g, ' ').trim();
const removeMarkdownCode = (str: string): string => str.replace(/```[^]+?```/g, '');
const removeMarkdownMarkup = (str: string): string => str.replace(/[*_]/g, '');
const getPostExcerpt = (body: string, length = 300): string => {
  const excerpt = body.slice(0, length);
  return excerpt.length === length ? `${excerpt}...` : excerpt;
};

/**
 * Safely get a post excerpt
 * @param body {string} - The post body
 */
export const safePostExcerpt = (body: string): string =>
  [
    // Apply the functions in the order they are listed
    removeHTMLTags,
    removeExtraSpaces,
    removeMarkdownCode,
    removeMarkdownMarkup,
    getPostExcerpt,
  ].reduce((res, fn) => fn(res), body);
