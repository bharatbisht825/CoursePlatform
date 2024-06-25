import axios from 'axios';
import { server } from '../store';

export const updateProfile = (name, email) => async dispatch => {
  try {
    dispatch({ type: 'uploadProfileRequest'});
    const { data } = await axios.put(
      `${server}/updateprofile`,
      {
        name,
        email,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    dispatch({ type: 'updateProfileSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'updateProfileFailure',
      payload: error.response.data.message,
    });
  }
};

export const changePassword = (oldPassword, newPassword) => async dispatch => {
  try {
    dispatch({ type: 'changePasswordRequest' });
    const { data } = await axios.put(
      `${server}/changepassword`,
      {
        oldPassword,
        newPassword,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    dispatch({ type: 'changePasswordSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'changePasswordFailure',
      payload: error.response.data.message,
    });
  }
};

export const updateProfilePicture = formData => async dispatch => {
  try {
    dispatch({ type: 'updateProfilePictureRequest' });
    const { data } = await axios.put(
      `${server}/updateprofilepicture`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    dispatch({ type: 'updateProfilePictureSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'updateProfilePictureFailure',
      payload: error.response.data.message,
    });
  }
};

export const forgotPassword = (email) => async dispatch => {
    try {
      dispatch({ type: 'forgotPasswordRequest' });
      const { data } = await axios.post(
        `${server}/forgotpassword`,
        {
          email
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
  
      dispatch({ type: 'forgotPasswordSuccess', payload: data.message });
    } catch (error) {
      dispatch({
        type: 'forgotPasswordFailure',
        payload: error.response.data.message,
      });
    }
  };
  
  export const resetPassword = (token,password) => async dispatch => {
    try {
      dispatch({ type: 'resetPasswordRequest' });
      const { data } = await axios.put(
        `${server}/resetpassword/${token}`,
        {
          password
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
  
      dispatch({ type: 'resetPasswordSuccess', payload: data.message });
    } catch (error) {
      dispatch({
        type: 'resetPasswordFailure',
        payload: error.response.data.message,
      });
    }
  };
  
  export const addToPlaylist = (id) => async dispatch => {
    try {
      dispatch({ type: 'addToPlaylistRequest'});
      const { data } = await axios.post(
        `${server}/addtoplaylist`,
        {
          id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      dispatch({ type: 'addToPlaylistSuccess', payload: data.message });
    } catch (error) {
      dispatch({
        type: 'addToPlaylistFailure',
        payload: error.response.data.message,
      });
    }
  };

  export const removeFromPlaylist = (id) => async dispatch => {
    try {
      dispatch({ type: 'removeFromPlaylistRequest'});
      const { data } = await axios.delete(
        `${server}/removefromplaylist?id=${id}`,
        {
          withCredentials: true,
        }
      );
      dispatch({ type: 'removeFromPlaylistSuccess', payload: data.message });
    } catch (error) {
      dispatch({
        type: 'removeFromPlaylistFailure',
        payload: error.response.data.message,
      });
    }
  };
  