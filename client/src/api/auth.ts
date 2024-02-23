import { api } from '@/api/index';
import type { IUserLoginRequest, IUserLoginResponse } from '@/types/user';

const injectedRtkApi = api.injectEndpoints({
  endpoints: ({ mutation }) => ({
    login: mutation<IUserLoginResponse, IUserLoginRequest>({
      query: (body) => ({ url: '/login', method: 'POST', body }),
    }),
  }),
});

export const { useLoginMutation } = injectedRtkApi;
