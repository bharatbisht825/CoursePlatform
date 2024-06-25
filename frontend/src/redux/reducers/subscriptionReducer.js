import { createReducer } from '@reduxjs/toolkit';

export const subscriptionReducer = createReducer(
  {},
  {
    createSubscriptionRequest: state => {
      state.isLoading = true;
    },
    createSubscriptionSuccess: (state, action) => {
      state.isLoading = false;
      state.subscriptionId = action.payload;
    },
    createSubscriptionFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    cancelSubscriptionRequest: state => {
      state.isLoading = true;
    },
    cancelSubscriptionSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    cancelSubscriptionFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
    clearMessage: state => {
      state.message = null;
    },
  }
);
