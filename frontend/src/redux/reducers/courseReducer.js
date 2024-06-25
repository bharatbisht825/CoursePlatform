import { createReducer } from '@reduxjs/toolkit';

export const courseReducer = createReducer(
  {
    courses: [],lectures:[]
  },
  {
    allCoursesRequest: state => {
      state.isLoading = true;
    },
    allCoursesSuccess: (state, action) => {
      state.isLoading = false;
      state.courses = action.payload;
    },
    allCoursesFailure: (state,action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
     addToPlaylistRequest: state => {
        state.isLoading = true;
      },
      addToPlaylistSuccess: (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      },
      addToPlaylistFailure: (state,action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
      getCourseRequest: state => {
        state.isLoading = true;
      },
      getCourseSuccess: (state, action) => {
        state.isLoading = false;
        state.lectures = action.payload;
      },
      getCourseFailure: (state,action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
    clearError : state =>{
        state.error = null
    },
    clearMessage : state =>{
        state.message = null
    }
  }
);
