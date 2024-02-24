import { api } from '@/api/index';
import type { IPost, IPostCreate } from '@/types/post';

const path = '/posts';
const type = 'Post';

const injectedRtkApi = api.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    searchPosts: query<IPost[], void>({
      query: () => ({ url: path }),
      providesTags: [type],
    }),
    createPost: mutation<IPost, IPostCreate>({
      query: (body) => ({ url: path, method: 'POST', body }),
      invalidatesTags: [type, 'User'],
    }),
  }),
});

export const { useSearchPostsQuery, useCreatePostMutation } = injectedRtkApi;
