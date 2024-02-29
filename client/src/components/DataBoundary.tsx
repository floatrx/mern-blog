import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { SerializedError } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { Spinner } from '@/components/ui/Spinner';

export type DataBoundaryProps<Item> = {
  data?: Item[] | undefined;
  render?: (item: Item) => ReactNode; // pass a render function to render the items
  name?: string; // name of the items (e.g. "Tags")
  isLoading: boolean; // if the query is 1st loading
  error?: FetchBaseQueryError | SerializedError | undefined;
  isFetching?: boolean; // if the query is fetching or re-fetching data
  children?: ReactNode; // extra children to render
  className?: string; // extra class name
};

export const DataBoundary = <Item,>({ isLoading, data, render, children, name, error, className }: DataBoundaryProps<Item>) => {
  // Wait for the data to load
  if (isLoading) return <Spinner spinning />;

  // If there is an error, display it
  if (error) return <div className="p-2">An error has occurred: {JSON.stringify(error)}</div>;

  return !data?.length ? (
    <p>{name || 'Items'} not found or not added yet.</p>
  ) : (
    <div className={className}>
      {isLoading && <p>Loading...</p>}
      {render && data?.map(render)}
      {children}
    </div>
  );
};
