import { api } from '@/api/index';
import { refreshAccessToken, setTokens, setUser } from '@/store/auth';

import type { IAuthLoginRequest, IAuthLoginResponse, ICheckAuthResponse, IRefreshTokenResponse } from '@/types/auth';

const path = '/auth';

export const authApi = api.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    login: mutation<IAuthLoginResponse, IAuthLoginRequest>({
      query: (body) => ({ url: `${path}/login`, method: 'POST', body }),
      onCacheEntryAdded: async (_, { cacheDataLoaded, dispatch }) => {
        const { data } = await cacheDataLoaded;
        dispatch(setTokens(data.tokens));
        dispatch(setUser(data.profile));
      },
    }),
    refresh: mutation<IRefreshTokenResponse, { refreshToken: string }>({
      query: (body) => ({ url: `auth/refresh`, method: 'POST', body }),
      onCacheEntryAdded: async (_, { cacheDataLoaded, dispatch }) => {
        const { data } = await cacheDataLoaded;
        dispatch(refreshAccessToken(data.accessToken));
      },
    }),
    checkAuth: query<ICheckAuthResponse, void>({
      query: () => ({ url: `${path}/check` }),
      extraOptions: {
        test: 'test',
      },
    }),
  }),
});

export const { useLoginMutation, useCheckAuthQuery, useLazyCheckAuthQuery, useRefreshMutation } = authApi;
