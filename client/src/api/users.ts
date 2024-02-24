import { api } from '@/api/index';
import type { IUser, IUserCreate } from '@/types/user';

const path = '/users';
const type = 'User';

const injectedRtkApi = api.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    searchUsers: query<IUser[], void>({
      query: () => ({ url: path }),
      providesTags: [type],
    }),
    createUser: mutation<IUser, IUserCreate>({
      query: (body) => ({ url: path, method: 'POST', body }),
      invalidatesTags: [type],
    }),
  }),
});

export const { useSearchUsersQuery, useCreateUserMutation } = injectedRtkApi;
