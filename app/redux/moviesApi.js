import {createApi} from '@reduxjs/toolkit/query/react';
import baseQueryWithReAuth from './baseQuery';

export const movies = createApi({
  reducerPath: 'movies',
  baseQuery: baseQueryWithReAuth,
  endpoints: builder => ({
    homeApi: builder.query({
      query: params => {
        const {genre, page} = params;
        console.log(params);
        return {
          url: '/movies/',
          params: {
            genre,
            page,
          },
        };
      },
      serializeQueryArgs: ({endpointName}) => {
        return endpointName;
      },
      merge: (currentCache, newItems, {arg}) => {
        if (arg.page === 1) {
          return newItems;
        } else {
          currentCache.movies.push(...newItems.movies);
        }
      },
      forceRefetch({currentArg, previousArg}) {
        return currentArg !== previousArg;
      },
    }),
    apiSearch: builder.query({
      query: params => {
        const {search, page} = params;
        console.log(params);
        return {
          url: '/movies/',
          params: {
            search,
            page,
          },
        };
      },
      serializeQueryArgs: ({endpointName}) => {
        return endpointName;
      },
      merge: (currentCache, newItems, {arg}) => {
        if (arg.page === 1) {
          return newItems;
        } else {
          currentCache.movies.push(...newItems.movies);
        }
      },
      forceRefetch({currentArg, previousArg}) {
        console.log('Prev: ', currentArg, previousArg);
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const {useApiSearchQuery, useHomeApiQuery} = movies;
