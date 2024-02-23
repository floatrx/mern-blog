import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import qs from 'query-string';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000/api',
  paramsSerializer: (params) => qs.stringify(params, { skipEmptyString: true, skipNull: true }),
});

/*
 * Define a service using app URL and expected endpoints
 * Enhance generated endpoints with tags: providesTags & invalidatesTags
 * https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tags
 * More at: https://www.graphql-code-generator.com/plugins/typescript-rtk-query
 */
export const api = createApi({
  reducerPath: '_api',
  tagTypes: ['User', 'Post'],
  refetchOnReconnect: true, // test it
  refetchOnFocus: true, // test it
  baseQuery,
  endpoints: () => ({}),
});
