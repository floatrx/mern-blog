import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL } from '@/config/const';
import type { RootState } from '@/store/store';
import qs from 'query-string';

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  paramsSerializer: (params) => qs.stringify(params, { skipEmptyString: true, skipNull: true }),
  prepareHeaders: (headers, { getState }) => {
    const { accessToken } = (getState() as RootState).auth;
    accessToken && headers.set('Authorization', `Bearer ${accessToken}`);
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions: Record<string, unknown>,
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    // console.log('Got 401. Logging out...');
    // api.dispatch(logout());
    // return baseQuery(args, api, extraOptions); <- TODO: retry
  }

  return result;
};

/*
 * Define a service using app URL and expected endpoints
 * Enhance generated endpoints with tags: providesTags & invalidatesTags
 * https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tags
 * More at: https://www.graphql-code-generator.com/plugins/typescript-rtk-query
 */
export const api = createApi({
  reducerPath: '_api',
  tagTypes: ['User', 'Post', 'Tag'],
  refetchOnReconnect: true, // test it
  refetchOnFocus: true, // test it
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
