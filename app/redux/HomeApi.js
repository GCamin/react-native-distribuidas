import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getToken = () => 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnaWFuLmNhbWluLjk4IiwiaWF0IjoxNzE4MTE5OTIyLCJleHAiOjE3MTgxMjE3MjJ9.cPreJlFL-ipuMkqLIEE-SryfVdxnCwT4UzoPIFSkOhY'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://distribuidas-back-production-b3e3.up.railway.app', 
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    test: builder.query({
      query: () => '/auth/test',
    }),
  }),
});

export const { useTestQuery } = api;