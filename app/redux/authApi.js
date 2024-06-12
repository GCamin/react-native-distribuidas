import {createApi} from '@reduxjs/toolkit/query/react';
import baseQueryWithReAuth from './baseQuery';

export const auth = createApi({
  reducerPath: 'auth',
  baseQuery: baseQueryWithReAuth,
  endpoints: builder => ({
    login: builder.mutation({
      query: idToken => ({
        url: '/auth/login',
        method: 'POST',
        params: {
          googletoken: idToken,
        },
      }),
    }),
    logout: builder.mutation({
      query: refreshToken => ({
        url: 'auth',
        method: 'DELETE',
        body: {
          refreshToken,
        },
      }),
    }),
  }),
});

export const {useLoginMutation, useLogoutMutation} = auth;
