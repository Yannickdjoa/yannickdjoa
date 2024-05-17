import { configureStore } from '@reduxjs/toolkit';
import stacksReducer from './stacks/stackSlice';

export const store = configureStore({
  reducer: {
    stacks: stacksReducer,
  },
});
