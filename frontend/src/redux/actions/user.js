import { server } from '../store';
import axios from 'axios';

export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: 'loginRequest' });
    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    dispatch({ type: 'loginSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'loginFailure', payload: error.response.data.message });
  }
};

export const loadUser = () => async dispatch => {
  try {
    dispatch({ type: 'loadUserRequest' });
    const { data } = await axios.get(`${server}/myprofile`, {
      withCredentials: true,
    });
    dispatch({ type: 'loadUserSuccess', payload: data.user });
  } catch (error) {
    dispatch({ type: 'loadUserFailure', payload: error.response.data.message });
  }
};

export const logout = () => async dispatch => {
    try {
      dispatch({ type: 'logoutRequest'});
      const { data } = await axios.get(`${server}/logout`, {
        withCredentials: true,
      });
      dispatch({ type: 'logoutSuccess', payload: data.message });
    } catch (error) {
      dispatch({ type: 'logoutFailure', payload: error.response.data.message });
    }
  };

  export const signUp = (formData) => async dispatch => {
  try {
    dispatch({ type: 'signUpRequest' });
    const { data } = await axios.post(
      `${server}/signup`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    );
    dispatch({ type: 'signUpSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'signUpFailure', payload: error.response.data.message });
  }
};

