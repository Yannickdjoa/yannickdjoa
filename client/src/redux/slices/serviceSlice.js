import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  servicesList: [],
  loading: null,
  error: false,
};

const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    startSettingServicesList: (state) => {
      state.loading = true;
      state.error = false;
    },
    failedToSetServicesList: (state) => {
      state.loading = false;
      state.error = true;
    },
    setServicesList: (state, action) => {
      state.servicesList = action.payload;
      state.loading = false;
      state.error = false;
    },
  },
});

export const {
  setServicesList,
  startSettingServicesList,
  failedToSetServicesList,
} = serviceSlice.actions;
export default serviceSlice.reducer;
