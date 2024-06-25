import { createReducer } from '@reduxjs/toolkit';

export const userReducer = createReducer(
  {},
  {
    loginRequest: state => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    signUpRequest: state => {
      state.isLoading = true;
    },
    signUpSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    signUpFailure: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logoutRequest: state => {
      state.isLoading = true;
    },
    logoutSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.message = action.payload;
    },
    logoutFailure: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.error = action.payload;
    },
    loadUserRequest: state => {
      state.isLoading = true;
    },
    loadUserSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loadUserFailure: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
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
