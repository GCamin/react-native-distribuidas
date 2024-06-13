import {createApi} from '@reduxjs/toolkit/query/react';
import baseQueryWithReAuth from './baseQuery';

export const usuario = createApi({
  reducerPath: 'users',
  baseQuery: baseQueryWithReAuth,
  endpoints: builder => ({
    userInfo: builder.query({
      query: userId => ({
        url: '/users/',
        params: {
          id: userId,
        },
      }),
    }),
    userCreate: builder.mutation({
      query: userId => ({
        url: '/users/',
        method: 'PUT',
        params: {
          id: userId,
        },
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

export const {useUserInfoQuery, useUserCreateMutation, useUserDeleteMutation} = usuario;
