// src/services/api.ts
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const getToken = () =>
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnaWFuLmNhbWluLjk4IiwiaWF0IjoxNzE4MTI4MzA4LCJleHAiOjE3MTgxMzAxMDh9.qqKXTdkjeXRqaJWioxVBSg99XPRFiGfkxcUda6yplPs';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://distribuidas-back-production-b3e3.up.railway.app',
    prepareHeaders: headers => {
      const token = getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    test: builder.query({
      query: () => '/auth/test',
    }),
  }),
});

export const {useTestQuery} = api;
