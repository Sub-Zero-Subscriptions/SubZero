import { configureStore } from '@reduxjs/toolkit';
import subscriptionSlice from './slices/subscriptionSlice';

export const store = configureStore({
  reducer: {
    subscriptionState: subscriptionSlice,
  },
});
