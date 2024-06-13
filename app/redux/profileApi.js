import {createApi} from '@reduxjs/toolkit/query/react';
import baseQueryWithReAuth from './baseQuery';
import { useSelector } from 'react-redux';

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
      query: (userId) => ({
        url: '/users/${userId}',
        method: 'DELETE',
        params: {
          id: userId,
        },
      }),
    }),
    updateUser: builder.mutation({
      query: ({ userId, userData }) => ({
        url: `/users/${userId}`,
        method: 'PUT',
        body: userData,
      }),
    }),
  }),
});

export const {useUserInfoQuery, useUserDeleteMutation, useUpdateUserMutation} = profile;
export default profile;
