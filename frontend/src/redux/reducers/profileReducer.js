import { createReducer } from '@reduxjs/toolkit';

export const profileReducer = createReducer(
  {},
  {
    uploadProfileRequest: state => {
      state.isLoading = true;
    },
    updateProfileSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    updateProfileFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    changePasswordRequest: state => {
      state.isLoading = true;
    },
    changePasswordSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    changePasswordFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    forgotPasswordRequest: state => {
        state.isLoading = true;
      },
      forgotPasswordSuccess: (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      },
      forgotPasswordFailure: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
      resetPasswordRequest: state => {
        state.isLoading = true;
      },
      resetPasswordSuccess: (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      },
      resetPasswordFailure: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
    updateProfilePictureRequest: state => {
      state.isLoading = true;
    },
    updateProfilePictureSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    updateProfilePictureFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    removeFromPlaylistRequest: state => {
      state.isLoading = true;
    },
    removeFromPlaylistSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    removeFromPlaylistFailure: (state, action) => {
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
