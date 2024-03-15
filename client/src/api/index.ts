/**
 * API service with base query and error handlers
 * - baseQuery: main fn. Provides custom header "Authorization" and parse query params
 * - baseQueryWithErrorHandlers: baseQuery with error handlers
 *   • 401 Unauthorized -> refresh token -> retry
 *   • 403 Forbidden -> logout
 *
 * NOTE: Ensure to check for token updates from the auth/refresh endpoint.
 *       Either through the refresh mechanism or when an entry is added to the store (authSlice).
 */
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL } from '@/config/const';
import { logout } from '@/store/auth';
import type { RootState } from '@/store/store';
import qs from 'query-string';

import type { BaseQueryHandler } from '@/types/rtkq';

let refreshPromise: Promise<any> | null = null; // flag to prevent multiple refresh token requests

/**
 * Base query with custom header
 */
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  paramsSerializer: (params) => qs.stringify(params, { skipEmptyString: true, skipNull: true }),
  prepareHeaders: (headers, { getState }) => {
    const { accessToken } = (getState() as RootState).auth.tokens;
    accessToken && headers.set('Authorization', `Bearer ${accessToken}`);
    return headers;
  },
});

/**
 * Handle errors
 */
const baseQueryWithErrorHandlers: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions: Record<string, unknown>,
) => {
  const result = await baseQuery(args, api, extraOptions);

  // if request is successful do nothing
  if (!result.error) return result; // OK

  // -- ERROR HANDLING --
  const { status } = result.error;

  // Handle 401 Unauthorized & refresh token -> "refreshPromise" wait other requests to finish
  if (status === 401) {
    await refreshAccessTokenAndRetry(args, api, extraOptions);
  }

  if (status === 403) {
    api.dispatch(logout());
  }

  return result;
};

/**
 * Refresh access token and retry the original request
 */
const refreshAccessTokenAndRetry: BaseQueryHandler = async (args, api, extraOptions) => {
  console.log('Handle refresh token and retry');

  // Prevent multiple refresh token requests
  while (refreshPromise) {
    console.log('Waiting for access token refresh');
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  try {
    const { auth } = api.getState() as RootState;
    const requestBody = { refreshToken: auth.tokens.refreshToken };
    /**
     * NOTE: Ensure to check for token updates from the auth/refresh endpoint,
     * either through the refresh mechanism or when an entry is added to the store (authSlice).
     */
    refreshPromise = api.dispatch(getReadyApi().endpoints['refresh'].initiate(requestBody));
    //                              ^^^^^^ used instead of "api" to avoid errors

    // Wait for the refresh token...
    await refreshPromise;

    // Retry the original request with the new access token
    return baseQuery(args, api, extraOptions); // retry original request
  } catch (error) {
    console.error('Refresh token failed:', error);
    api.dispatch(logout());
  } finally {
    refreshPromise = null;
  }
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
  baseQuery: baseQueryWithErrorHandlers,
  endpoints: () => ({}),
});

/**
 * Export the ready-to-use API [workaround]
 * Use this function to avoid typescript and runtime errors:
 *  - "Cannot read property 'endpoints' of undefined"
 *  - "Cannot access 'api' before initialization"
 */
const getReadyApi = () => api;
