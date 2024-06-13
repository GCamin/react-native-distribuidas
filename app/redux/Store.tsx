// src/store.ts
import {configureStore} from '@reduxjs/toolkit';
import {movies} from './moviesApi';
import userReducer from './user';
import {auth} from './authApi';
import {profile} from './profileApi';

export const store = configureStore({
  reducer: {
    [movies.reducerPath]: movies.reducer,
    [profile.reducerPath]: profile.reducer,
    [auth.reducerPath]: auth.reducer,
    user: userReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      movies.middleware,
      profile.middleware,
      auth.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
