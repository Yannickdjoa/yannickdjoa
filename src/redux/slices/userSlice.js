import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: undefined,
  userList: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogInStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    userLoginsuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.currentUser = action.payload;
    },
    userLoginfailed: (state) => {
      state.loading = false;
      state.error = true;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.error = null;
      state.loading = false;
      state.currentUser = action.payload;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      (state.currentUser = null), (state.loading = false), (state.error = null);
    },
    deleteUserFailure: (state) => {
      (state.loading = false), (state.error = true);
    },
    signOutStart: (state) => {
      state.loading = true;
    },
    signOutSuccess: (state) => {
      (state.currentUser = null), (state.loading = false), (state.error = null);
    },
    signOutFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    UploadingUserList: (state) => {
      state.loading = true;
      state.error = false;
    },
    failedToUploadUserList: (state) => {
      state.loading = false;
      state.error = true;
    },
    setUserList: (state, action) => {
      state.userList = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  userLogInStart,
  userLoginfailed,
  userLoginsuccess,
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutFailure,
  signOutStart,
  signOutSuccess,
  setUserList,
  failedToUploadUserList,
  UploadingUserList,
} = userSlice.actions;

export const loginUser = (state) => state.user;
export default userSlice.reducer;
