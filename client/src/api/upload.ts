import { api } from '@/api/index';

const injectedRtkApi = api.injectEndpoints({
  endpoints: ({ mutation }) => ({
    upload: mutation<{ location: string; name: string }, FormData>({
      query: (body) => ({ url: '/upload', method: 'POST', body }),
    }),
  }),
});

export { injectedRtkApi as uploadApi };

export const { useUploadMutation } = injectedRtkApi;
