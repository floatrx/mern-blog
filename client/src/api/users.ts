import { api } from '@/api/index';
import type { IUser, IUserCreate, IUserUpdate } from '@/types/user';

const path = '/users';
const type = 'User';

const injectedRtkApi = api.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    searchUsers: query<IUser[], void>({
      query: () => ({ url: path }),
      providesTags: [type],
    }),
    getUser: query<IUser, string>({
      query: (idUser) => ({ url: `${path}/${idUser}` }),
      providesTags: [type],
    }),
    createUser: mutation<IUser, IUserCreate>({
      query: (body) => ({ url: path, method: 'POST', body }),
      invalidatesTags: [type],
    }),
    updateUser: mutation<IUser, IUserUpdate>({
      query: (body) => ({ url: path, method: 'PUT', body }),
      invalidatesTags: [type],
    }),
    deleteUser: mutation<IUser, string>({
      query: (idUser) => ({ url: `${path}/${idUser}`, method: 'DELETE' }),
      invalidatesTags: [type],
    }),
  }),
});

export const { useSearchUsersQuery, useCreateUserMutation } = injectedRtkApi;
