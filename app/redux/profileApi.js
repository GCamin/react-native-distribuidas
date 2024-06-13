import {createApi} from '@reduxjs/toolkit/query/react';
import baseQueryWithReAuth from './baseQuery';

export const profile = createApi({
  reducerPath: 'users',
  baseQuery: baseQueryWithReAuth,
  endpoints: builder => ({
    userInfo: builder.query({
      query: userId => ({
        url: `/users/${userId}`,
      }),
    }),
    userDelete: builder.mutation({
      query: userId => ({
        url: '/users/',
        method: 'DELETE',
        params: {
          id: userId,
        },
      }),
    }),
  }),
});

export const {useUserInfoQuery, useUserDeleteMutation} = profile;
