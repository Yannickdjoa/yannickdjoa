import { configureStore } from '@reduxjs/toolkit';
import stacksReducer from './slices/stackSlice';
import experiencesReducer from './slices/experienceSlice';
import projectsReducer from './slices/projectSlice';
import servicesReducer from './slices/serviceSlice';
import webintroReducer from './slices/webIntroSlice';
import heroListReducer from './slices/heroSlice';
import textcollectionReducer from './slices/textcollectionSlice';
import biodataReducer from './slices/bioSlice';

export const store = configureStore({
  reducer: {
    stacks: stacksReducer,
    experiences: experiencesReducer,
    projects: projectsReducer,
    services: servicesReducer,
    webintro: webintroReducer,
    hero: heroListReducer,
    textcollection: textcollectionReducer,
    biodata: biodataReducer,
  },
});
