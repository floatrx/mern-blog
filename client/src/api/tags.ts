import { api } from '@/api/index';
import type { ITag, ITagCreate } from '@/types/tag';

const path = '/tags';
const type = 'Tag';

const injectedRtkApi = api.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    searchTags: query<ITag[], { name?: string }>({
      query: (params) => ({ url: path, params }),
      providesTags: [type],
    }),
    getTag: query<ITag, string | undefined>({
      query: (id) => `${path}/${id}`,
      providesTags: [type],
    }),
    createTag: mutation<ITag, ITagCreate>({
      query: (body) => ({ url: path, method: 'POST', body }),
      invalidatesTags: [type],
    }),
    updateTag: mutation<ITag, Partial<ITagCreate> & { id: string }>({
      query: ({ id, ...body }) => ({ url: `${path}/${id}`, method: 'PUT', body }),
      invalidatesTags: [type],
    }),
    deleteTag: mutation<ITag, string>({
      query: (id) => ({ url: `${path}/${id}`, method: 'DELETE' }),
      invalidatesTags: [type],
    }),
  }),
});

export const { useSearchTagsQuery, useGetTagQuery, useCreateTagMutation, useUpdateTagMutation, useDeleteTagMutation } = injectedRtkApi;
