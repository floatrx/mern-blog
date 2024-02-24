import type { IUserLoginRequest, IUserLoginResponse } from '@/types/user';
import { api } from '@/api/index';
import { setToken, setUser } from '@/store/auth';

const path = '/auth';

const injectedRtkApi = api.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    login: mutation<IUserLoginResponse, IUserLoginRequest>({
      query: (body) => ({ url: `${path}/login`, method: 'POST', body }),
      onCacheEntryAdded: async (_, { cacheDataLoaded, dispatch }) => {
        const { data } = await cacheDataLoaded;
        dispatch(setToken(data.accessToken));
        dispatch(setUser(data.profile));
      },
    }),
    check: query<unknown, void>({
      query: () => ({ url: `${path}/check` }),
    }),
  }),
});

export const { useLoginMutation, useLazyCheckQuery } = injectedRtkApi;
