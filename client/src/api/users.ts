import { api } from '@/api/index';
import { updateUser } from '@/store/auth';

import type { IUser, IUserCreateRequest, IUserUpdateRequest } from '@/types/user';

const path = '/users';
const type = 'User';

const injectedRtkApi = api.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    searchUsers: query<IUser[], void>({
      query: () => ({ url: path }),
      providesTags: [type],
    }),
    getUser: query<IUser, ID>({
      query: (idUser) => ({ url: `${path}/${idUser}` }),
      providesTags: [type],
    }),
    createUser: mutation<IUser, IUserCreateRequest>({
      query: (body) => ({ url: path, method: 'POST', body }),
      invalidatesTags: [type],
    }),
    updateUser: mutation<IUser, IUserUpdateRequest>({
      query: ({ id, ...body }) => ({ url: `${path}/${id}`, method: 'PUT', body }),
      onCacheEntryAdded: (result, { dispatch }) => {
        dispatch(updateUser(result));
      },
      invalidatesTags: [type],
    }),
    deleteUser: mutation<IUser, ID>({
      query: (idUser) => ({ url: `${path}/${idUser}`, method: 'DELETE' }),
      invalidatesTags: [type],
    }),
  }),
});

export const { useSearchUsersQuery, useCreateUserMutation, useUpdateUserMutation } = injectedRtkApi;
