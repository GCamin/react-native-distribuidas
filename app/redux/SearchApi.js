import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getToken = () => 'eyJhbGciOiJIUzI1NiJzdWIiOiJnaWFuLmNhbWluLjk4IiwiaWF0IjoxNzE4MTI4MzA4LCJleHAiOjE3MTgxMzAxMDh9.qqKXTdkjeXRqaJWioxVBSg99XPRFiGfkxcUda6yplPs';

export const ApiSearch = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://distribuidas-back-production-b3e3.up.railway.app',
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    apiSearch: builder.query({
      query: (params) => {
        const { search, page } = params;
        console.log(params)
        return `/movies/?search=${encodeURIComponent(search)}&page=${page}`;
      },
    }),
  }),
});

export const { useApiSearchQuery } = ApiSearch;
