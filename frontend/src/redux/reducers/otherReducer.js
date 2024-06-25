import { createReducer } from '@reduxjs/toolkit';

export const otherReducer = createReducer(
  {},
  {
    contactRequest: state => {
      state.isLoading = true;
    },
    contactSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    contactFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    courseRequest: state => {
      state.isLoading = true;
    },
    courseSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    courseFailure: (state, action) => {
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
