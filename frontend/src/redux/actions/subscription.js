import axios from 'axios';
import { server } from '../store';

export const createSubscription = () => async dispatch => {
    try {
      dispatch({ type: 'createSubscriptionRequest' });
      const { data } = await axios.get(
        `${server}/subscribe`,
        {
          withCredentials: true,
        }
      );
      dispatch({ type: 'createSubscriptionSuccess', payload: data.subscriptionId });
    } catch (error) {
      dispatch({ type: 'createSubscriptionFailure', payload: error.response.data.message });
    }
  };

  export const cancelSubscription = () => async dispatch => {
    try {
      dispatch({ type: 'cancelSubscriptionRequest' });
      const { data } = await axios.delete(
        `${server}/cancelsubscription`,
        {
          withCredentials: true,
        }
      );
      dispatch({ type: 'cancelSubscriptionSuccess', payload: data.message });
    } catch (error) {
      dispatch({ type: 'cancelSubscriptionFailure', payload: error.response.data.message });
    }
  };