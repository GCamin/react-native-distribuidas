import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {logOut, setCredentials} from './user';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://distribuidas-back-production-b3e3.up.railway.app',
  prepareHeaders: (headers, {getState}) => {
    const token = getState().user.jwtToken;
    console.log('EXISTE TOKEN', token);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  console.log(args, api);
  let result = await baseQuery(args, api, extraOptions);

  /* if (result.error && result.error.status === 401) {
    const refreshToken = api.getState().userSession.refreshToken;
    const refreshResult = await baseQuery(
      {
        url: '/auth/refreshToken',
        method: 'POST',
        body: {refreshToken},
      },
      api,
      extraOptions,
    );
    if (refreshResult.data) {
      const currentState = api.getState().user;
      api.dispatch(
        setCredentials({
          ...currentState,
          jwtToken: refreshResult.data.jwtToken,
          jwtRefreshToken: refreshResult.data.jwtRefreshToken,
        }),
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  } */
  return result;
};

export default baseQueryWithReAuth;
