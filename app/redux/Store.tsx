// src/store.ts
import {configureStore} from '@reduxjs/toolkit';
import {api} from './ApiTest';
import {movies} from './moviesApi';
import userReducer from './user';
import {auth} from './authApi';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [movies.reducerPath]: movies.reducer,
    [auth.reducerPath]: auth.reducer,
    user: userReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      movies.middleware,
      api.middleware,
      auth.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
