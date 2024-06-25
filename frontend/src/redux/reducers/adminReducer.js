import { createReducer } from '@reduxjs/toolkit';

export const adminReducer = createReducer(
  {},
  {
    getAllUsersRequest: state => {
      state.isLoading = true;
    },
    getAllUsersSuccess: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    getAllUsersFailure: (state,action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateUserRoleRequest: state => {
      state.isLoading = true;
    },
    updateUserRoleSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    updateUserRoleFailure: (state,action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteUserRequest: state => {
      state.isLoading = true;
    },
    deleteUserSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    deleteUserFailure: (state,action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    createCourseRequest: state => {
      state.isLoading = true;
    },
    createCourseSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    createCourseFailure: (state,action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteCourseRequest: state => {
      state.isLoading = true;
    },
    deleteCourseSuccess : (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    deleteCourseFailure: (state,action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addLectureRequest: state => {
      state.isLoading = true;
    },
    addLectureSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    addLectureFailure: (state,action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteLectureRequest: state => {
      state.isLoading = true;
    },
    deleteLectureSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    deleteLectureFailure: (state,action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getDashboardStatsRequest: state => {
      state.isLoading = true;
    },
    getDashboardStatsSuccess: (state, action) => {
      state.isLoading = false;
      state.stats = action.payload.stats;
      state.usersCount = action.payload.usersCount;
      state.viewsCount = action.payload.viewsCount;
      state.subscriptionCount = action.payload.subscriptionCount;
      state.usersPercentage = action.payload.usersPercentage;
      state.subscriptionPercentage = action.payload.subscriptionPercentage;
      state.viewsPercentage = action.payload.viewsPercentage;
      state.subscriptionProfit = action.payload.subscriptionProfit;
      state.usersProfit = action.payload.usersProfit;
      state.viewsProfit = action.payload.viewsProfit;
    },
    getDashboardStatsFailure: (state,action) => {
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

