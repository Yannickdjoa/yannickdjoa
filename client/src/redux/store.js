import { configureStore } from '@reduxjs/toolkit';
import stacksReducer from './stacks/stackSlice';
import experiencesReducer from './stacks/experienceSlice';

export const store = configureStore({
  reducer: {
    stacks: stacksReducer,
    experiences: experiencesReducer,
  },
});
