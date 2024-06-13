// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogged: false,
  id: null,
  jwtToken: null,
  jwtRefreshToken: null,
  name: '',
  nickName: '',
  email: '',
  profileImageUrl: '',
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
      state.name = action.payload.name;
      state.nickName = action.payload.nickName;
      state.email = action.payload.email;
      state.profileImageUrl = action.payload.profileImageUrl;
    },
    logOut: state => {
      state.isLogged = false;
      state.id = null;
      state.jwtToken = null;
      state.jwtRefreshToken = null;
      state.name = '';
      state.nickName = '';
      state.email = '';
      state.profileImageUrl = '';
    },
    updateUserProfile: (state, action) => {
      state.name = action.payload.name;
      state.nickName = action.payload.nickName;
      state.email = action.payload.email;
      state.profileImageUrl = action.payload.profileImageUrl;
    },
  },
});

export const { setCredentials, logOut, updateUserProfile } = userSlice.actions;

export default userSlice.reducer;
