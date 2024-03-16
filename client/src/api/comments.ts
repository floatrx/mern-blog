import { api } from '@/api/index';

import type { IComment, ICommentCreateRequest } from '@/types/comment';

const path = '/comment';
const type = 'Tag';

const injectedRtkApi = api.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getComments: query<IComment[], { idPost: string }>({
      query: (params) => ({ url: path, params }),
      providesTags: [type],
    }),
    getCommentsThread: query<IComment[], string>({
      query: (id) => `${path}/post/${id}`,
      providesTags: [type],
    }),
    postComment: mutation<IComment, ICommentCreateRequest>({
      query: (body) => ({ url: path, method: 'POST', body }),
      invalidatesTags: [type],
    }),
    deleteComment: mutation<void, string>({
      query: (id) => ({ url: `${path}/${id}`, method: 'DELETE' }),
      invalidatesTags: [type],
      extraOptions: { maxRetries: 0 },
    }),
  }),
});

export const { useGetCommentsQuery, useGetCommentsThreadQuery, usePostCommentMutation, useDeleteCommentMutation } = injectedRtkApi;
