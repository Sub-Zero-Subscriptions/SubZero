import { createSlice } from '@reduxjs/toolkit';
import uuid from 'react-uuid';

const initialState = {
  subscriptions: [],
  isEditMode: false,
  selectedSubscription: null,
};

export const subscriptionSlice = createSlice({
  name: 'subscriptionSlice',
  initialState,
  reducers: {
    toggleIsEditMode: (state, action) => {
      const { isEditMode, subscriptionId } = action.payload;
      state.isEditMode = isEditMode;
      state.selectedSubscription = state.subscriptions.find(
        (sub) => sub.sub_id === subscriptionId
      );
    },
    addSubscription: (state, action) => {
      const sub = action.payload;
      state.subscriptions.push({ ...sub, sub_id: uuid() });
    },
    editSubscription: (state, action) => {
      const filteredSubs = state.subscriptions.filter((subscription) => {
        subscription.sub_id !== state.selectedSubscription.sub_id;
      });
      state.subscriptions = [...filteredSubs, action.payload];
      state.selectedSubscription = null;
      state.isEditMode = false;
    },
    deleteSubscription: (state, action) => {
      state.subscriptions = state.subscriptions.filter(
        (subscription) => subscription.sub_id !== action.payload
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addSubscription,
  editSubscription,
  deleteSubscription,
  toggleIsEditMode,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
