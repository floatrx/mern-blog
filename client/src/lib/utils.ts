import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const upperFirst = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

//Excerpt content with three dots at the end if larger
export const getExcerpt = (content: string, length: number = 300): string => {
  return content.length > length ? content.slice(0, length) + '…' : content;
};
