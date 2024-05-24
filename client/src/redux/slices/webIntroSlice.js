import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  webIntroData: [],
  loading: null,
  error: false,
};

const webintroSlice = createSlice({
  name: 'webintro',
  initialState,
  reducers: {
    startSettingWebIntroData: (state) => {
      state.loading = true;
      state.error = false;
    },
    failedToSetWebIntroData: (state) => {
      state.loading = false;
      state.error = true;
    },
    setWebIntroData: (state, action) => {
      state.webIntroData = action.payload;
      state.loading = false;
      state.error = false;
    },
  },
});

export const {
  setWebIntroData,
  startSettingWebIntroData,
  failedToSetWebIntroData,
} = webintroSlice.actions;
export const selectAllWebIntro = (state) => state.webintro;
export default webintroSlice.reducer;
