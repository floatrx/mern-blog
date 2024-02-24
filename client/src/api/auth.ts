import { api } from '@/api/index';
import type { IUserLoginRequest, IUserLoginResponse } from '@/types/user';

const path = '/auth';

const injectedRtkApi = api.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    login: mutation<IUserLoginResponse, IUserLoginRequest>({
      query: (body) => ({ url: `${path}/login`, method: 'POST', body }),
      onCacheEntryAdded: async (_, { cacheDataLoaded }) => {
        const { data } = await cacheDataLoaded;
        localStorage.setItem('accessToken', data.accessToken);
      },
    }),
    check: query<unknown, void>({
      query: () => ({ url: '${path}/check' }),
    }),
  }),
});

export const { useLoginMutation, useLazyCheckQuery } = injectedRtkApi;
