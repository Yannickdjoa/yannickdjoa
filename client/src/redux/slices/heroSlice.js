import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  heroList: [],
  loading: false,
  error: null,
};

const heroSlice = createSlice({
  name: 'hero',
  initialState,
  reducers: {
    startGettingHeroList: (state) => {
      state.loading = true;
    },
    errorGettingHeroList: (state) => {
      state.loading = false;
      state.error = true;
    },
    setHeroList: (state, action) => {
      state.loading = false;
      state.error = false;
      state.heroList = action.payload;
    },
  },
});

export const selectAllHeroList = (state) => state.hero;
export const { startGettingHeroList, errorGettingHeroList, setHeroList } =
  heroSlice.actions;
export default heroSlice.reducer;
