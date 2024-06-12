import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLogged: false,
  id: null,
  jwtToken: null,
  jwtRefreshToken: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.isLogged = true;
      state.id = action.payload.id;
      state.jwtToken = action.payload.jwtToken;
      state.jwtRefreshToken = action.payload.jwtRefreshToken;
    },
    logOut: state => {
      state.isLogged = false;
      state.id = null;
      state.jwtToken = null;
      state.jwtRefreshToken = null;
    },
  },
});

export const {setCredentials, logOut} = userSlice.actions;

export default userSlice.reducer;
